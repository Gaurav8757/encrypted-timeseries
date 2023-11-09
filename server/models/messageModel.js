// messageModel.js
import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
  name: String,
  origin: String,
  destination: String,
  secretKey: String,
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('Message', MessageSchema);

const messageModel = {
  saveMessage: (messageObject) => {
    const newMessage = new MessageModel(messageObject);
    return newMessage.save();
  },
};

export default messageModel;
