import "@tsed/ajv";
import {Configuration, Inject, PlatformAcceptMimesMiddleware, PlatformApplication} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/swagger";

import * as express from "express";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";
import {User} from "./domain/User";

import * as dotenv from "dotenv";
dotenv.config();

import customRedisAdapter from "./middlewares/CustomRedisAdapter";

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8000,
  httpsPort: false, // CHANGE
  mount: {
    "/api": [`${rootDir}/controllers/**/*.ts`]
  },
  mongoose: [
    {
      id: "default", // Recommended: define default connection. All models without dbName will be assigned to this connection
      url: process.env.DATABASE_URL || "mongodb://localhost:27017",
      connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
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
    adapter: customRedisAdapter()
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
      );
  }
}
