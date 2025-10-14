// user.js
// documentation sources from https://www.npmjs.com/package/mongoose

// base components of a class/object in mongoDB
const Schema = mongoose.Schema;

// User Class
const UserSchema = new Schema({
    _id: {type: String, required: true},
    profession: {type: String, required: true},
    genre: {type: String, required: true},
    biography: {type: String, required: true},
    phone_num: {type: String, required: true},
    email: {type: String, required: true},

    // array of digitalAudioWorkspaces
    daws: [String],
    external_visits: [String],
    
    // Buffer stores Binary data
    profile_pic: Buffer,

    // documentation for map https://mongoosejs.com/docs/schematypes.html#arrays
    social_media: {
        type: Map,
        of: String
    }
});

mongoose.model("User", UserSchema);