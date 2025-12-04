import express from "express";
// import { jwtCheck } from "../middleware/auth.js";
import * as uc from "../controllers/userController.js";
const app = express.Router();

// create a user
app.post("/", uc.createUser);

// app.get("/", jwtCheck, (req, res) => {
//     res.status(200).send("auth passed");
// });

app.get("/", uc.getUsers);
app.get("/search", uc.getSpecificUsers)
app.get("/:username", uc.getSpecificUser);
app.put("/:username", uc.updateSpecificUser);

export default app;