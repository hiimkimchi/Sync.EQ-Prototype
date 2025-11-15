import express from "express";
import chat from "../models/chat";
const app = express.Router();
import * as cc from "../controllers/chatController"

app.get("/", cc.getAllChats);
app.get("/:username", cc.getSpecificUsersChats);