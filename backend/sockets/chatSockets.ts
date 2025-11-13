import { Server, Socket } from "socket.io";

export default function registerSocketHandlers(io: Server, socket: Socket) {
    // handling chat messages
    socket.on("message", (data) => {
      console.log("Message received:", data);
      io.emit("receiveMessage", data);
    });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
}