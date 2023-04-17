const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    password: String
    chat_rooms: [UserChatRooms]
    last_message_time: String
    total_messages: Int
    last_open_room: ChatRoom
    theme: String
  }

  type UserChatRooms {
    room_name: String
    chat_room: String
  }

  type ChatRoom {
    _id: ID
    users: [User]
    messages: [Message]
  }

  type RoomSubscription {
    _id: ID
    name: String
    message_text: String
  }

  type Message {
    _id: ID
    message: String
    created_at: String
    user: User
  }

  type testMessage {
    message_text: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getAllUsers: [User]
    getUser(username: String!): User
    getAllChatRooms: [ChatRoom]
    getChatRoom(chatRoomId: ID!): ChatRoom
  }

  type Mutation {
    createUser(username: String!, password: String!): Auth
    changePassword(oldPassword: String!, newPassword: String!): Auth
    login(username: String!, password: String!): Auth
    addUserToRoom(chatRoomId: ID!, roomName: String!): ChatRoom
    addChatRoom(name: String!): ChatRoom
    renameChatRoom(chatRoomId: ID!, name: String!): ChatRoom
    deleteChatRoom(chatRoomId: ID!): ChatRoom
    postMessage(message_text: String!, chat_room: String!): Message
  }

  type Subscription {
    subscribeToRoom(chat_room: String!): Message
  }
`;

export default typeDefs;
