// imports + dotenv loading
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const mongoDB = process.env.MONGO_URL;

// connects to mongoDB
export default async function connectMongoose() : Promise<typeof mongoose>{
    try {
        if(mongoDB) {
            return await mongoose.connect(mongoDB);
            console.log(`Mongoose fully connected`);
        } else {
            console.error("Mongoose Failure");
            process.exit(1);
        }
    } catch(err) {
        console.error("Mongoose Failure: ", err);
        process.exit(1);
    }
}