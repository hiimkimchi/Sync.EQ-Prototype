// userchat.js 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// if this is a media 
const UserChatSchema = new Schema({
    _id: {type: String, required: true},
    user1: {type: String, required: true},
});

// idea for messaging aspect
// - if both users online: set up a socket
// - else: run backend services and deliver to a chathistory object
mongoose.model("UserChat", UserChatSchema);