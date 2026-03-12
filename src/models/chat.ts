import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const chatSchema = new Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }],
    messages: [messageSchema]
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;