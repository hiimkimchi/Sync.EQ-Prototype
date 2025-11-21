import express from "express";
import * as mc from "../controllers/mediaController";
import multer from "multer";
const app = express.Router();

const upload = multer();

app.get("/", mc.getAllMedia);
app.get("/:username", mc.getUsersMedia);
app.get("/:username/profilepic", mc.getUserProfilePic);
app.get("/:username/:mediaID", mc.getSpecificMedia);

app.post("/:username/profilepic", upload.single("file"), mc.createUserProfilePic);
app.put("/:username/profilepic", upload.single("file"), mc.replaceUserProfilePic);
export default app;