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
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

dotenv.config();
const port = process.env.PORT;
const frontend = process.env.FRONTEND

const urls = [
  process.env.FRONTEND,
  process.env.LOCAL
]

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (urls.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// sets up connection to mongoDB
await connectMongoose();
app.use(express.json())

app.use(cors({
    origin: function (origin, callback) {
      // Allow Postman, curl, mobile apps
      if (!origin) return callback(null, true);

      if (urls.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },    methods: ["GET", "POST", "PUT", "DELETE"],
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

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  registerSocketHandlers(io, socket);
});

// captures a port to listen for HTTP requests
server.listen(port, () => {
    console.log(`SyncEQ Backend listening on port ${port}`);
})