// user.js
// documentation sources from https://www.npmjs.com/package/mongoose

import mongoose from "mongoose";

// User Class
const UserSchema = new mongoose.Schema({
    _id: {type: String},
    auth0id: {type: String, required: true, unique: true},
    artistAlias: {type: String, required: true},
    profession: {type: [String], required: true},
    genre: {type: [String], required: true, default: []},
    biography: {type: String, required: true},
    phone_num: {type: String, required: true},
    email: {type: String, required: true},

    // array of digitalAudioWorkspaces
    daws: [String],
    external_visits: {type: [String], default: []},
    
    // Buffer stores Binary data
    profile_pic: Buffer,

    // documentation for map https://mongoosejs.com/docs/schematypes.html#arrays
    social_media: {
        type: Map,
        of: String
    }
}, {
    _id: false
});

export default mongoose.model("User", UserSchema);