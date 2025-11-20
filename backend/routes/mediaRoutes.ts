import express from "express";
import * as mc from "../controllers/mediaController";
import multer from "multer";
const app = express.Router();

const upload = multer();

app.get("/", mc.getAllMedia);
app.get("/:username", mc.getUsersMedia);
app.get("/:username/profilepic", upload.single("file"), mc.getUserProfilePic);
app.get("/:username/:mediaID", mc.getSpecificMedia);

app.post("/:username/profilepic", mc.createUserProfilePic); //change to sumn like createUserProfilePic
app.put("/:username/profilepic", mc.replaceUserProfilePic); //change to sumn like replaceUserProfilePic
export default app;