import Express from "express";

import { Socket } from "socket.io";
import * as Events from "./socketEvents";
import { Server } from "socket.io";

const app = Express();
const port = 5001;

const router = Express.Router();
router.get("/", (_, res) => {
  res.send("Hello, thyck bois and gorls of the world!");
});

app.use("/h2h", router);

const server = app.listen(port, () => console.log("Listening on port " + port));
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/h2h",
});

io.on("connection", (socket: Socket) => {
  socket.on("create", Events.create(socket));
  socket.on("join", Events.join(socket));

  socket.on("quit-game", Events.quitGame(socket));
  socket.on("quit-lobby", Events.quitLobby(socket));

  socket.on("setting", Events.setting(socket));

  socket.on("add-custom", (code: string) => {
    socket.to(code).emit("add-custom");
  });
  socket.on("custom", Events.customCard);

  socket.on("start-game", Events.startGame(socket));

  socket.on("next-card", Events.nextCard(socket));

  socket.on("disconnecting", Events.disconnecting(socket));
});
