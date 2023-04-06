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
      console.log(`NEW CONNECTION: ${isAuthorized}`);

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
      - 'emotionGameStats': ROS is sending back stats about what they got right/wrong in JSON format, save to DB
        - Args: string

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

    // Forward to mobile
    socket.on("speak", (message: string) => {
      console.log((new Date()) + " || Received speak event with message '" + message + "'")
      io.emit('speak', message)
    })

    // Forward to ROS
    socket.on('emotionGame', (action: EmotionGameAction) => {
      console.log((new Date()) + " || Received emotionGame event with action '" + action + "'")
      io.emit('emotionGame', action)
    })

    // Forward to ROS
    socket.on('recalibrate', () => io.emit('recalibrate'))

    // Emotion game was successfully stopped and is passing back data
    socket.on('emotionGameStats', (statsJSON: string) => {
      console.log((new Date()) + " || Received emotionGameStats event")
      // TODO: Get the UserID from mobile and save as part of the document
      const statsRaw = JSON.parse(statsJSON);

      if (!statsRaw) {
        console.log("Failed to save Emotion Game stats - UserID in return was undefined or empty")
        return;
      }

      const finishedGame = new EmotionRecognition({
        Correct: statsRaw.Correct ?? [0, 0, 0, 0],
        Wrong: statsRaw.Wrong ?? [0, 0, 0, 0],
        NumPlays: statsRaw.NumPlays ?? 0,
        UserID: statsRaw.UserID ?? "",
        GameFin: new Date()
      });

      finishedGame.save((err) => {
        if (err) console.error(err);
        else console.log("Successfully saved event!");
      })


      socket.on("disconnecting", reason => {
        console.log(`disconnecting ${socket.id}: ${reason}`);
      });
    });
  })
};
