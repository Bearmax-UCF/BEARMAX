import type { Server } from "socket.io";

/** Register socket.io event handlers
 */
export default (io: Server) => {
  io.on("connection", socket => {
    console.log("connected");
    socket.on("yo", () => console.log("yo"));
  });
};
