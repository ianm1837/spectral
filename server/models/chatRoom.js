import { Schema, model } from 'mongoose';

const chatRoomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ],
  last_message_time: {
    type: Date,
    default: null
  }
});

const ChatRoom = model('ChatRoom', chatRoomSchema);

export default ChatRoom;
