import "@tsed/ajv";
import {Configuration, Inject, PlatformAcceptMimesMiddleware, PlatformApplication} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/socketio";
import "@tsed/swagger";
import {$log} from "@tsed/logger";
import "@tsed/logger-rabbitmq";
import * as express from "express";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";

import {User} from "./domain/User";
import * as dotenv from "dotenv";
import customRedisMiddleware from "./middlewares/CustomRedisMiddleware";
import createPeerServerListeners from "./services/socket/GroupCallHandler";
import {PeerServer} from "peer";

dotenv.config();

export const isProduction = process.env.NODE_ENV === "production";

$log.name = "XADROGA_SERVER";
$log.level = "debug";
// if (isProduction) {
//   $log.appenders.set("stdout", {
//     type: "seq",
//     level: ["debug"],
//     options: {
//       hostname: process.env.RABBITMQ_HOST,
//       port: 5672,
//       username: process.env.RABBITMQ_USER,
//       password: process.env.RABBITMQ_PASSWORD,
//       routing_key: 'logstash',
//       exchange: 'exchange_logs',
//       mq_type: 'direct',
//       durable: true
//     }
//   });
// }

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8000,
  httpsPort: false, // CHANGE
  mount: {
    "/": [`${rootDir}/controllers/pages/**/*.ts`],
    "/api": [`${rootDir}/controllers/**/*.ts`]
  },
  mongoose: [
    {
      id: "default", // Recommended: define default connection. All models without dbName will be assigned to this connection
      url: process.env.DATABASE_URL || "mongodb://localhost:27017",
      connectionOptions: {
        autoIndex: true,
      }
    }
  ],
  swagger: [
    {
      path: "/docs",
      specVersion: "3.0.1"
    }
  ],
  socketIO: {
    adapter: customRedisMiddleware(),
    cors: {origin: "*"}
  },
  views: {
    root: `${rootDir}/../views`,
    viewEngine: "ejs"
  },
  logger: {
    disableRoutesSummary: isProduction
  },
  exclude: ["**/*.spec.ts"],
  componentsScan: [`${rootDir}/protocols/*Protocol.ts`],
  passport: {
    userInfoModel: User
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit(): void | Promise<any> {
    const peerServer = PeerServer();
    peerServer.use(cors());
    createPeerServerListeners(peerServer);
    this.app
      .use(cors())
      .use(PlatformAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(express.json())
      .use(
        express.urlencoded({
          extended: true
        })
      )
      .use("/peerjs", peerServer);
  }
}
