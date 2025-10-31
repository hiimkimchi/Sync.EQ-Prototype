import express from "express";
import * as uc from "../controllers/authController";
const app = express.Router();

app.get("/check", uc.authenticateUser);