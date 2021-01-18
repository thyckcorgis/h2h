import Express from "express";
import { randCode, shuffleArray, joinArray } from "./helpers";

import categories from "./categories.json";

const app = Express();
const port = 5001;

const router = Express.Router();
router.get("/", (_, res) => {
  res.send("Hello, thyck bois and gorls of the world!");
});

const rooms = {};
const roomExists = (code) => rooms[code] != null;
const addUserToRoom = (name, code) => rooms[code]?.users.push(name);
const endTurn = (code) => {
  const room = rooms[code];
  rooms[code].current = (room?.current + 1) % room?.users.length;
};
const changeRoomSettings = (code, settings) => {
  rooms[code].settings = settings;
};
const getCurrentPlayer = (code) => rooms[code]?.users[rooms[code].current];
const drawCard = (code) => {
  const card = rooms[code]?.cards.pop();
  rooms[code].currentCard = card;
  return card;
};
const getCardCategories = (code) => {
  const { settings, customs } = rooms[code];
  let arr = [];
  Object.entries(settings).forEach(([key, val]) => {
    if (val && key !== "customCards") {
      arr = joinArray(arr, categories[key]);
    }
  });

  if (settings.customCards) arr = joinArray(arr, customs);
  arr = shuffleArray(arr);
  return arr;
};

const getCurrentCard = (code) => rooms[code].currentCard;
const removeUser = (code, name) => {
  if (rooms[code]) {
    rooms[code].users = rooms[code]?.users.filter(
      (arrName) => arrName !== name
    );
    rooms[code].current = rooms[code]?.current % rooms[code]?.users.length;
  }
};
const getNewHost = (code, isHost) => (isHost ? rooms[code]?.users[0] : "");
const userExistsInRoom = (name, code) => rooms[code]?.users.includes(name);

const createRoom = (name) => {
  let code = randCode();
  while (roomExists(code)) code = randCode();

  rooms[code] = {
    users: [name],
    current: 0,
    cards: [],
    gameStarted: false,
    currentCard: "",
    settings: {
      happy: true,
      heavy: true,
      toTheSpeaker: true,
      selfReflection: true,
      customCards: false,
    },
    customs: [],
  };

  return code;
};

app.use("/h2h", router);

const server = app.listen(port, () => console.log("Listening on port " + port));
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/h2h",
});

io.on("connection", (socket) => {
  socket.on("create", (name, fn) => {
    const code = createRoom(name);
    socket.join(code);
    fn(code);
  });
  socket.on("join", (name, code, fn) => {
    if (!roomExists(code))
      return fn({ ok: false, message: "Room does not exist" });

    if (userExistsInRoom(name, code))
      return fn({ ok: false, message: "Name is already taken" });

    addUserToRoom(name, code);
    socket.join(code);
    const current = getCurrentPlayer(code);
    const card = getCurrentCard(code);
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
    removeUser(code, name);
    const newHost = getNewHost(code, isHost);
    socket.leave(code);
    socket.to(code).emit("quit-game", {
      playerQuit: name,
      current: getCurrentPlayer(code),
      card: getCurrentCard(code),
      newHost,
      users: rooms[code].users,
    });
  });
  socket.on("quit-lobby", (code, name, isHost) => {
    removeUser(code, name);
    socket.leave(code);
    socket.to(code).emit("quit-lobby", {
      newHost: getNewHost(code, isHost),
      users: rooms[code].users,
    });
  });

  socket.on("add-custom", (code) => {
    socket.to(code).emit("add-custom");
  });

  socket.on("start-game", (code, fn) => {
    rooms[code].gameStarted = true;
    rooms[code].cards = [...getCardCategories(code)];
    drawCard(code);
    const card = getCurrentCard(code);
    const current = getCurrentPlayer(code);
    const users = rooms[code].users;
    fn({ current, card, users });
    socket.to(code).emit("start-game", {
      ok: true,
      message: "game has been started by host",
      current,
      card,
      users,
    });
  });
  socket.on("next-card", (code, fn) => {
    endTurn(code);
    const current = getCurrentPlayer(code);
    drawCard(code);
    const card = getCurrentCard(code);
    fn({ current, card });
    socket.to(code).emit("next-card", {
      ok: true,
      current,
      card,
    });
  });
  socket.on("setting", (code, settings) => {
    changeRoomSettings(code, settings);
    socket.to(code).emit("setting", settings);
  });

  socket.on("custom", (code, question, fn) => {
    if (!rooms[code].settings.customCards) {
      return fn({
        ok: false,
        message: "Custom cards are not allowed in this room",
      });
    }
    rooms[code].customs.push(question);
    fn({ ok: true, message: "Added anonymous custom card" });
  });
});
