import express from "express";
import * as pc from "../controllers/postController.js"
const app = express.Router();

//create a post
app.post("/", pc.createPost);

//get a post via unique post id
app.get("/:username/:postId", pc.getSpecificPost);
app.get("/:username", pc.getUsersPosts);
app.get("/", pc.getAllPosts);

export default app;