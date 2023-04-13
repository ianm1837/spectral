import { GraphQLError } from 'graphql';
import { User, ChatRoom, Message } from '../models/index.js';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();



const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('chat_rooms')
          .populate('last_open_room');
        return userData;
      }
      throw new GraphQLError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('chat_rooms')
        .populate('last_open_room');
    },
    chat_rooms: async (parent, { username }) => {
      const params = username ? { name: username } : {};
      return ChatRoom.find(params).sort({ createdAt: desc });
    },
    messages: async (parent, { chatRoomId }) => {
      const params = chatRoomId ? { chatRoomId } : {};
      return Message.find(params).sort({ createdAt: desc });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addChatRoom: async (parent, args, context) => {
      if (context.user) {
        const chatRoom = await ChatRoom.create({ ...args, users: [context.user._id] });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { chat_rooms: chatRoom._id } },
          { new: true }
        );
        return chatRoom;
      }
      throw new GraphQLError('Not logged in');
    }
  },
  Subscription: {
    newChatRoom: {
      subscribe: () => pubsub.asyncIterator('NEW_CHAT_ROOM')
    },
    newMessage: {
      subscribe: () => pubsub.asyncIterator('NEW_MESSAGE')
    }
  },
};

export default resolvers;