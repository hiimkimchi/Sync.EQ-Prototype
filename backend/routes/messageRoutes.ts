import express from "express";
import * as mc from "../controllers/messageController.js";
import {Response, Request} from "express";
const app = express.Router();

app.get("/");
app.get("/:username", mc.getUserMessages);