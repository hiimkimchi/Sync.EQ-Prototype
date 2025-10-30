// chat.js 
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; 

const ChatSchema = new Schema({
    _id: {type: ObjectId, required: true},
    user1: {type: String, required: true},
    user2: {type: String, required: true},
    // message ids will be stored here
    chatMessages: {type: [String], required: true, default: []},
});

export default mongoose.model("Chat", ChatSchema);