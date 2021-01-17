const express = require("express");
const app = express();
const { shuffleArray, randCode, getRandArray } = require("./random");

const port = 5001;

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello, world!");
});

const rooms = {};
const roomExists = (code) => rooms[code] != null;
const addUserToRoom = (name, code) => rooms[code].users.push(name);
const endTurn = (code) => {
  const room = rooms[code];
  rooms[code].current = (room.current + 1) % room.users.length;
};
const getCurrentPlayer = (code) => rooms[code].users[rooms[code].current];
const questions = require("./questions.json");
const drawCard = (code) => {
  const idx = rooms[code].cards.pop();
  rooms[code].currentCard = questions[idx];
};
const getCurrentCard = (code) => rooms[code].currentCard;

// unnecessary edge case for the presentation
// const userExistsInRoom = (name, code) => rooms[code].users.includes(name);

const createRoom = (name) => {
  let code = randCode();
  while (roomExists(code)) {
    code = randCode();
  }

  rooms[code] = {
    users: [name],
    current: 0,
    cards: getRandArray(questions.length),
    gameStarted: false,
    currentCard: "",
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
      return fn({ ok: false, message: "room does not exist" });

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
    });
    socket.to(code).emit("player-joined", { ok: true, user: name });
  });

  socket.on("quit-game", (code, name, isHost) => {
    socket.to(code).emit("quit-game", { current, card, newHost });
  });

  socket.on("start-game", (code, fn) => {
    rooms[code].gameStarted = true;
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
});
