// message.js
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// if this is a media 
const MessageSchema = new Schema({
    _id: {type: ObjectId, required: true},
    chatID: {type: String, required: true},
    author: {type: String, required: true},
    receiver: {type: String, required: true},
    content: {type: String, required: true, default: null},
    mediaID: {type: String},
}, {
    timestamps: true,
});

// idea for messaging aspect
// - if both users online: set up a socket
// - else: run backend services and deliver to a chathistory object
mongoose.model("Message", MessageSchema);