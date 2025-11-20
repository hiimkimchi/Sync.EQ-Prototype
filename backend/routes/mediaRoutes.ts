import express from "express";
import * as mc from "../controllers/mediaController";
const app = express.Router();

app.get("/", mc.getAllMedia);
app.get("/:username", mc.getUsersMedia);
app.get("/:username/profilepic", mc.getUserProfilePic);
app.get("/:username/:mediaID", mc.getSpecificMedia);

app.post("/:username/profilepic", mc.getAllMedia); //change to sumn like createUserProfilePic
app.put("/:username/profilepic", mc.getAllMedia); //change to sumn like replaceUserProfilePic
export default app;