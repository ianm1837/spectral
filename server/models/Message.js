const { Shchema, model } = require('mongoose');

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  chat_room: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
    read_time: {
    type: Date,
    default: null
  }
});

const Message = model('Message', messageSchema);

module.exports = Message;
