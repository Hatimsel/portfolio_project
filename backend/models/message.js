import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: { type: Types.ObjectId, required: true },
    receiverId: { type: Types.ObjectId, required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    receivedAt: { type: Date },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
