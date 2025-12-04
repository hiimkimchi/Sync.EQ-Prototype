import express from "express";
import * as uc from "../controllers/authController.js";
const app = express.Router();

app.get("/check", uc.authenticateUser);

export default app