// message.js
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId;

const MessageSchema = new mongoose.Schema({
    chatID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true
    },

    author: {
      type: String,
      required: true
    },

    content: {
        type: String, 
        required: true, 
        default: null
    },

    mediaID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media"
    }
}, {
    timestamps: true,
});

// idea for messaging aspect
// - if both users online: set up a socket
// - else: run backend services and deliver to a chathistory object
export default mongoose.model("Message", MessageSchema);