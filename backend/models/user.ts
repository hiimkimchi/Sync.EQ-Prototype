// user.js
// documentation sources from https://www.npmjs.com/package/mongoose

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; 

// User Class
const UserSchema = new mongoose.Schema({
    auth0id: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    artistAlias: {type: String, required: true},
    professions: {type: [String], required: true},
    genres: {type: [String], required: true, default: []},
    biography: {type: String, required: true},
    phone_num: {type: String, required: true},
    email: {type: String, required: true},

    // array of digitalAudioWorkspaces
    daws: [String],
    external_visits: {type: [String], default: []},
    
    // Buffer stores Binary data
    profile_pic: String,

    // documentation for map https://mongoosejs.com/docs/schematypes.html#arrays
    social_media: {
        type: Map,
        of: String
    }
}, );

export default mongoose.model("User", UserSchema);