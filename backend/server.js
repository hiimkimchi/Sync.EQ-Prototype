// import files
import express from "express";
import connectMongoose from "./db.js";
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv"
const app = express();

dotenv.config();
const port = process.env.PORT;

// sets up connection to mongoDB
await connectMongoose();
app.use(express.json())

// default route
app.get('/', (req, res) => {
    res.send("Hello, SyncEQ!");
});

app.use("/api/users", userRoutes);

// captures a port to listen for HTTP requests
app.listen(port, () => {
    console.log(`SyncEQ Backend listening on port ${port}`);
})