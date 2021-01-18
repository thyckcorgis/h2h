import Express from "express";
import { randCode, errorMessage } from "./helpers";
import Room from "./Room";

import { Socket } from "socket.io";

const app = Express();
const port = 5001;

const router = Express.Router();
router.get("/", (_, res) => {
  res.send("Hello, thyck bois and gorls of the world!");
});

const rooms: { [T: string]: Room } = {};
const roomExists = (code: string) => rooms[code] != null;

const createRoom = (name: string) => {
  let code = randCode();
  while (roomExists(code)) code = randCode();

  rooms[code] = new Room(name);
  return code;
};

app.use("/h2h", router);

const server = app.listen(port, () => console.log("Listening on port " + port));
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/h2h",
});

io.on("connection", (socket: Socket) => {
  socket.on("create", (name, fn) => {
    const code = createRoom(name);
    socket.join(code);
    fn(code);
  });
  socket.on("join", (name, code, fn) => {
    if (!roomExists(code)) return fn(errorMessage("Room does not exist"));

    const room = rooms[code];

    if (room.userExists(name)) return fn(errorMessage("Name is already taken"));

    room.addUser(name);
    socket.join(code);
    const current = room.getCurrentPlayer();
    const card = room.getCurrentCard();
    fn({
      ok: true,
      message: `joined room ${code}`,
      users: rooms[code].users,
      current,
      card,
      gameStarted: rooms[code].gameStarted,
      settings: rooms[code].settings,
    });
    socket.to(code).emit("player-joined", name);
  });

  socket.on("quit-game", (code, name, isHost) => {
    const room = rooms[code];
    room.removeUser(name);
    const newHost = room.getNewHost(isHost);
    socket.leave(code);
    socket.to(code).emit("quit-game", {
      playerQuit: name,
      current: room.getCurrentPlayer(),
      card: room.getCurrentCard(),
      newHost,
      users: rooms[code].users,
    });
  });
  socket.on("quit-lobby", (code, name, isHost) => {
    const room = rooms[code];
    room.removeUser(name);
    socket.leave(code);
    socket.to(code).emit("quit-lobby", {
      newHost: room.getNewHost(isHost),
      users: rooms[code].users,
    });
  });

  socket.on("add-custom", (code) => {
    socket.to(code).emit("add-custom");
  });

  socket.on("start-game", (code, fn) => {
    const room = rooms[code];
    room.startGame();
    room.createCardDeck();
    room.drawCard();

    const data = {
      card: room.getCurrentCard(),
      current: room.getCurrentPlayer(),
      users: room.getUsers(),
    };
    fn(data);
    socket.to(code).emit("start-game", {
      ok: true,
      message: "game has been started by host",
      ...data,
    });
  });

  socket.on("next-card", (code, fn) => {
    const room = rooms[code];
    room.endTurn();
    room.drawCard();
    const data = {
      current: room.getCurrentPlayer(),
      card: room.getCurrentCard(),
    };
    fn(data);
    socket.to(code).emit("next-card", {
      ok: true,
      ...data,
    });
  });

  socket.on("setting", (code, settings) => {
    rooms[code].setSettings(settings);
    socket.to(code).emit("setting", settings);
  });

  socket.on("custom", (code, question, fn) => {
    const room = rooms[code];
    if (!room.customCardsEnabled()) {
      return fn(errorMessage("Custom cards are not allowed in this room"));
    }
    room.addCustomCard(question);
    fn({ ok: true, message: "Added anonymous custom card" });
  });
});
