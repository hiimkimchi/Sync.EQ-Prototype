import express from "express";
import * as pc from "../controllers/postController"
const app = express.Router();

//create a post
app.post("/", pc.createPost);

//get a post via unique post id
app.get("/", pc.getAllPosts);
app.get("/:username", pc.getUsersPosts);
app.get("/:username/:postId", pc.getSpecificPost);

export default app;