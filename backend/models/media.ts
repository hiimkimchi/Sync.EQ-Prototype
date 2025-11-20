// media.js 
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; 

const fileTypeEnum = [
    "profilepic"
]

// if this is a media 
const MediaSchema = new mongoose.Schema({
    _id: {
        type: ObjectId, 
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    fileType: {
        type: String, 
        enum: fileTypeEnum,
        required: true
    },
    filePath: {
        type: String, 
        required: true
    },
});

// idea for messaging aspect
// - if both users online: set up a socket
// - else: run backend services and deliver to a chathistory object
export default mongoose.model("Media", MediaSchema);