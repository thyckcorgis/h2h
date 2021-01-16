const express = require("express");
const app = express();

const port = 5001;

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello, world!");
});

const rooms = {};

const randCode = () => (Math.floor(Math.random() * 90000) + 10000).toString();

const createRoom = (name) => {
  let code = randCode();
  if (rooms[code] != null) {
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
    fn(code);
  });
});
