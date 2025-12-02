// import files
import express from "express";
import connectMongoose from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"
import mediaRoutes from "./routes/mediaRoutes.js"
import registerSocketHandlers from "./sockets/chatSockets.js";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});


dotenv.config();
const port = process.env.PORT;
const frontend = process.env.FRONTEND

// sets up connection to mongoDB
await connectMongoose();
app.use(express.json())

app.use(cors({
    origin: frontend,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// default route
app.get('/', (req, res) => {
    res.json("Hello, SyncEQ!");
    console.log("login detected")
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/media", mediaRoutes);

const angular = path.join(__dirname, "../frontend/dist/synceq");
app.use(express.static(angular));

app.get("*", (req, res) => {
  res.sendFile(path.join(angular, "index.html"));
})

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  registerSocketHandlers(io, socket);
});

// captures a port to listen for HTTP requests
server.listen(port, () => {
    console.log(`SyncEQ Backend listening on port ${port}`);
})