import {$log} from "@tsed/logger";

const createPeerServerListeners = (peerServer: any) => {
  peerServer.on('connection', (client: any) => {
    $log.debug("[PEER] New connection, ID =>", client.id);
  });
};

export default createPeerServerListeners;
