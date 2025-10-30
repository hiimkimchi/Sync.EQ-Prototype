import express from "express";
import { jwtCheck } from "../middleware/auth.js";
import * as uc from "../controllers/userController.js";
const app = express.Router();

// create a user
app.post("/", uc.authenticateUser);

// app.get("/", jwtCheck, (req, res) => {
//     res.status(200).send("auth passed");
// });

app.get("/check", uc.authenticateUser);
app.get("/get/:username", uc.getSpecificUser);
app.get("/get", uc.getUsers);

export default app;