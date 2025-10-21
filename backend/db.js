// imports + dotenv loading
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const mongoDB = process.env.MONGO_URL;

// connects to mongoDB
export default async function connectMongoose() {
    try {
        await mongoose.connect(mongoDB);
        console.log(`Mongoose fully connected`);
    } catch(err) {
        console.error("Mongoose Failure: ", err);
        process.exit(1);
    }
}