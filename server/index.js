const express = require("express");
const app = express();

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
const getCurrentPlayer = (code) => rooms[code].users(rooms[code].current);
const questions = require("./questions.json");

// unnecessary edge case for the presentation
// const userExistsInRoom = (name, code) => rooms[code].users.includes(name);

const randCode = () => (Math.floor(Math.random() * 90000) + 10000).toString();

const createRoom = (name) => {
  let code = randCode();
  while (roomExists(code)) {
    code = randCode();
  }

  rooms[code] = { users: [name], current: 0 };
  return code;
};

app.use("/h2h", router);

const server = app.listen(port, () => console.log("Listening on port " + port));
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/h2h",
});

io.on("connection", (socket) => {
  // socket.on("create", (name, fn) => {
  //   const code = createRoom(name);
  //   console.log({ name, code });
  //   fn(code);
  // });
  // socket.emit("message", "hello");
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
    fn({ ok: true, message: `joined room ${code}`, users: rooms[code].users });
    socket.to(code).emit("player-joined", { ok: true, user: name });
  });
  socket.on("start-game", (code, fn) => {
    fn();
    socket.to(code).emit("start-game", {
      ok: true,
      message: "game has been started by host",
    });
  });
  socket.on("next-card", (code) => {
    endTurn(code);
    const nextPlayer = getCurrentPlayer(code);
    socket.to(code).emit("next-card", {
      ok: true,
      nextPlayer,
    });
  });
});
