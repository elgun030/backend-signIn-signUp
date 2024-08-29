import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {timestamps: true}
)

const Message = mongoose.model("Message", messageSchema)

export default Message