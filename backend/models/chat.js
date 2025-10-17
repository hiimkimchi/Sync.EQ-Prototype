// chat.js 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChatSchema = new Schema({
    _id: {type: ObjectId, required: true},
    user1: {type: String, required: true},
    user2: {type: String, required: true},
    // message ids will be stored here
    user1Chats: {type: [String], required: true, default: []},
    user2Chats: {type: [String], required: true, default: []},
});

mongoose.model("Chat", ChatSchema);