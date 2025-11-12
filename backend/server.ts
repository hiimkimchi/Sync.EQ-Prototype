// import files
import express from "express";
import connectMongoose from "./db.js";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import cors from "cors"
const app = express();

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

// captures a port to listen for HTTP requests
app.listen(port, () => {
    console.log(`SyncEQ Backend listening on port ${port}`);
})