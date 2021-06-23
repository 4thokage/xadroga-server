/* Storage configuration */

import {$log} from "@tsed/logger";

const { createClient } = require("redis");
const redisAdapter = require("socket.io-redis");

const customRedisAdapter : any = () => {

  const redisURI = process.env.STORAGE_URL || "";

  const host = redisURI.slice(0, redisURI.indexOf(":"));
  const port = redisURI.slice(redisURI.indexOf(":") + 1);
  const auth_pass = process.env.STORAGE_PSWD;

  const client = createClient({
    port, host, auth_pass
  });

  client.on("connect", (_: any) =>
    $log.info("Storage connected ==> ", redisURI)
  );

  client.on("error", (err: any) =>
    $log.error("Storage Connection Error!\n", err)
  );

  // Attaching redis-adapter to the socket for scaling the storage across multiple processes and machines
  const pubClient = client;
  const subClient = pubClient.duplicate();
  return redisAdapter({ pubClient, subClient });

};

export default customRedisAdapter;
