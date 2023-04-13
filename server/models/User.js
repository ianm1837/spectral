import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  chat_rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom'
    }
  ],
  last_message_time: {
    type: Date,
    default: null
  },
  total_messages: {
    type: Number,
    default: 0
  },
  last_open_room: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
    default: null
  },
  theme: {
    type: String,
    default: 'dracula'
  }
});


// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
}
);

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

export default User;