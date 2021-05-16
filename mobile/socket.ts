import { io } from "socket.io-client";

const socket = () =>
  io("https://thyck.top", {
    path: "/h2h",
  });

export default socket();
