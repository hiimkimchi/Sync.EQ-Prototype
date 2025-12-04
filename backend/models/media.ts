// media.js 
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; 

const fileTypeEnum = [
    "profilepic",
    "audio"
]

// Rules for media objects:
// 1. If filetype is profilepic, it is assumed the profile pic is unique per user.
// 2. If filetype is audio, retrieve via projectName.
//     - projectName is not necessarily unique in backend as implementation may work without it; however, frontend will have safeguards to make unique anyways.
//     - not implemented yet so idk actually

const MediaSchema = new mongoose.Schema(
    {
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
        projectName: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Media", MediaSchema);