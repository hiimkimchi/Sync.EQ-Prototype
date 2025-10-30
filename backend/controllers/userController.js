import User from "../models/user.js";

export async function getUsers(req, res) {
    try {
        const users = await User.find();
        if(users.length === 0) {
            return res.status(404).json({ error: "No users in db" });
        }
        res.status(200).json(users);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

export async function getSpecificUser(req, res) {
    try {
        console.log("received request for " + req.params.username)
        const user = await User.findOne({ username: req.params.username });
        if(!user) {
            console.log(`failed to find user of name: ${req.params.username}`)
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

export async function authenticateUser(req, res) {
    console.log("connection received");
    try {
        const auth0ID = req.auth.payload.sub; 
        let user = await User.findOne({ auth0ID });
        if (!user) {
            console.log("user not found")
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Server failed, Try Again Later" });
    }
}

export async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(err) {
        res.status(400).json({error: err.message});
    } 
}