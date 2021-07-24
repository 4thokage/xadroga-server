// Loading all the relevant dependencies
import express from "express";
import passport from "passport";

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const socket = require("socket.io");

// Fetching all the configurations
import configDB from "./configs/db.config";
import configAuth from "./configs/auth.config";
const {customRedisAdapter} = require("./configs/storage.config");

configDB().then(configAuth(passport));

const app = express();

// Using required middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize({}));

app.set("jwt-secret", process.env.AUTH_SECRET);
app.use("/api", require("./middlewares/auth"));
app.use("/api", require("./routes/user.route"));
app.use("/api", require("./routes/profile.route"));
app.use("/api", require("./routes/game.route"));

// Running the server at port PORT or default 8000
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is Live!\nListening on port: ${port}`);
});

// Setting up the socket and configuring it
const io = socket(server, {transports: ["websocket"]});
require("./routes/socket.route")(io, configStorage(io));

export default app;
