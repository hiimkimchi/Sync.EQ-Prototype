// media.js 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// if this is a media 
const MediaSchema = new Schema({
    _id: {type: ObjectId, required: true},
    author: {type: String, required: true},
    fileType: {type: String, required: true},
    mediaID: {type: String},
});

// idea for messaging aspect
// - if both users online: set up a socket
// - else: run backend services and deliver to a chathistory object
mongoose.model("Media", MediaSchema);