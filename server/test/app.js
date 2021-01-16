const socket = io("https://thyck.top", {
  path: "/h2h",
});

const createRoom = document.getElementById("create");
const joinRoom = document.getElementById("join");

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
