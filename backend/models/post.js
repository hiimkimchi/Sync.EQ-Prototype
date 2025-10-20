// post.js 
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; 

const PostSchema = new Schema({
    _id: {type: ObjectId, required: true},
    chatID: {type: String, required: true},
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true, default: null},
    mediaID: {type: String, default: null},
}, {
    timestamps: true,
});

export default mongoose.model("Post", PostSchema);