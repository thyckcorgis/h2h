import Express from "express";

import { Socket } from "socket.io";
import {
  createEvent,
  customCardEvent,
  joinEvent,
  nextCardEvent,
  quitGameEvent,
  quitLobbyEvent,
  settingEvent,
  startGameEvent,
} from "./socketEvents";

const app = Express();
const port = 5001;

const router = Express.Router();
router.get("/", (_, res) => {
  res.send("Hello, thyck bois and gorls of the world!");
});

app.use("/h2h", router);

const server = app.listen(port, () => console.log("Listening on port " + port));
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/h2h",
});

io.on("connection", (socket: Socket) => {
  socket.on("create", createEvent(socket));
  socket.on("join", joinEvent(socket));

  socket.on("quit-game", quitGameEvent(socket));
  socket.on("quit-lobby", quitLobbyEvent(socket));

  socket.on("setting", settingEvent(socket));

  socket.on("add-custom", (code: string) => {
    socket.to(code).emit("add-custom");
  });
  socket.on("custom", customCardEvent);

  socket.on("start-game", startGameEvent(socket));

  socket.on("next-card", nextCardEvent(socket));
});
