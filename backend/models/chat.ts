// chat.js 
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; 

const ChatSchema = new mongoose.Schema({
    user1: {
        type: String, 
        required: true
    },
    user2: {
        type: String, 
        required: true
    },
    // new design
    recentMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
});

export default mongoose.model("Chat", ChatSchema);