import { Server, Socket } from "socket.io";
import Message from "../models/message.js"

export default function registerSocketHandlers(io: Server, socket: Socket) {
    // handling chat messages
    socket.on("message", async (data) => {
      console.log("Message received:", data);

      const message = await Message.create({
        chatID: data.chatID,
        author: data.author,
        content: data.content
      });

      io.emit("receiveMessage", data);
    });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
}