const socket = io("https://thyck.top", {
  path: "/h2h",
});

const createRoom = document.getElementById("create");
const joinRoom = document.getElementById("join");

createRoom.addEventListener("click", () => {
  socket.emit("create", name);
});
