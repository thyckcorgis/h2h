import { io } from "socket.io-client";

export default io("https://thyck.top", { path: "/h2h" });
