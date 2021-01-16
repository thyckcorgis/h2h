const socket = io("https://thyck.top", {
  path: "/h2h",
});

const createRoom = document.getElementById("create");
const joinRoom = document.getElementById("join");
const startGame = document.getElementById("start");

let playerName = "charles";
createRoom.addEventListener("click", () => {
  socket.emit("create", playerName, (data) => {
    console.log(data);
  });
});

joinRoom.addEventListener("click", () => {
  socket.emit("join", playerName, code, (data) => {
    console.log(data);
  });
});

startGame.addEventListener("click", () => {
  socket.emit("start-game", code);
});

socket.on("start-game", (data) => {
  console.log(data);
});
