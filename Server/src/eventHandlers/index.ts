import type { Server } from "socket.io";
import constants from "../utils/constants";
import { EmotionGameAction, EmotionGameStats } from "../utils/types"
import EmotionRecognition from "../models/EmotionRecognition"

/** Register socket.io event handlers
 */
export default (io: Server) => {

  // Ensure websocket clients have a valid client certificate
  if (constants.isProduction) {
    io.engine.on("connection", (rawSocket) => {
      const isAuthorized = rawSocket.request.client.authorized;

      if (!isAuthorized) {
        const err = new Error("not authorized");
        (err as Error & { data: { content: string; } }).data = {
          content: "Not Authorized, invalid or missing client certificate."
        };
        rawSocket.emit("connect_error", err);
        rawSocket.close();
      }
    });
  }

  /*
  Events:

    Server listening:
    - 'speak': ROS sending message for mobile app to caption
        - Args: message (string)
    - 'emotionGame': Mobile app sending message to control start/stopping the emotion game
        - Args: action ("start" or "stop")
    - 'recalibrate': Mobile app sending request for camera and sensors to recalibrate
        - Args: none

    Client Listeneing (ROS or Mobile)
    - 'speak': Server sends message to mobile to caption message
        - Args: message (string)
    - 'emotionGame': ROS listening for start/stop updates to the emotion game
        - Args: action ("start" or "stop")
    - 'recalibrate': ROS listening for requests to recalibrate camera and sensors 
        - Args: none
  */

  io.on("connection", socket => {
    console.log("New connection " + socket.id);

    socket.on("speak", (message: string) => {
      io.emit('speak', message)
    })

    socket.on('emotionGame', (action: EmotionGameAction) => {
      if (action === "start") {
        io.emit('emotionGame', action)
      } else {
        const UserID = "TODO"; // TODO: Get the UserID from the mobile client socket
        io.emit('emotionGame', action, UserID, (stats: EmotionGameStats) => {
          const finishedGame = new EmotionRecognition({
            ...stats,
            UserID,
            GameFin: new Date()
          });

          finishedGame.save((err) => console.error(err));
        })
      }
    })

    socket.on('recalibrate', () => io.emit('recalibrate'))

    socket.on("disconnecting", reason => {
      console.log(`disconnecting ${socket.id}: ${reason}`);
    });
  });

};
