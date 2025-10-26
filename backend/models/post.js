// post.js 
import mongoose from "mongoose";

const PostSchema = new Schema({
    _id: {type: String, required: true},
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true, default: null},
    mediaID: {type: String, default: null}, //id and retrieval from s3

    //can collect usernames of likes and reposts, 
    //calculate and cache total for numbers of likes and reposts
    likes_usernames: {type: [String], required: true},
    reposts_usernames: {type: [String], required: true},
}, {
    timestamps: true
})

export default mongoose.model("Post", PostSchema);