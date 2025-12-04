import express from "express";
import * as mc from "../controllers/mediaController.js";
import multer from "multer";
const app = express.Router();

const upload = multer();

app.get("/:username/audio", mc.getUserAudio);
app.get("/:username/audio/:filePath", mc.getUserAudioFile);
app.post("/:username/audio", upload.single("file"), mc.createUserAudio);

app.get("/:username/profilepic", mc.getUserProfilePic);
app.post("/:username/profilepic", upload.single("file"), mc.createUserProfilePic);
app.put("/:username/profilepic", upload.single("file"), mc.replaceUserProfilePic);
export default app;