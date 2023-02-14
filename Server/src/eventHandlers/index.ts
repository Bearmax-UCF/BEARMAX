import type { Server } from "socket.io";
import constants from "../utils/constants";

/** Register socket.io event handlers
 */
export default (io: Server) => {

  // Ensure websocket clients have a valid client certificate
  if (constants.isProduction) {
    io.engine.on("connection", (rawSocket) => {
      const isAuthorized = rawSocket.request.client.authorized;

      if (!isAuthorized) {
        const err = new Error("not authorized");
        (err as Error & {data: { content: string; }}).data = {
          content: "Not Authorized, invalid or missing client certificate."
        };
        rawSocket.emit("connect_error", err);
        rawSocket.close();
      }
    });
  }

  io.on("connection", socket => {
    console.log("connected");

    socket.on("yo", () => console.log("yo"));

    socket.on("message", (...d) => console.log(d));

    socket.on("ping", () => socket.emit("pong"));

    socket.on("disconnecting", reason => {
      console.log(`disconnecting: ${reason}`);
    });
  });

};
