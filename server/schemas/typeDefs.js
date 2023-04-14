const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    password: String
    chat_rooms: [ChatRoom]
    last_message_time: String
    total_messages: Int
    last_open_room: ChatRoom
    theme: String
  }

  type ChatRoom {
    _id: ID
    name: String
    users: [User]
    messages: [Message]
  }

  type Message {
    _id: ID
    message_text: String
    message_time: String
    user: User
    chat_room: ChatRoom
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    chat_rooms: [ChatRoom]
    chat_room(room_name: String!): ChatRoom
    messages: [Message]
    message(_id: ID!): Message
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addChatRoom(name: String!): ChatRoom
    addMessage(message_text: String!, chat_room: ID!): Message
    updateLastMessageTime(last_message_time: String!): User
    updateTotalMessages(total_messages: Int!): User
    updateLastOpenRoom(last_open_room: ID!): User
    updateTheme(theme: String!): User
  }

  type Subscription {
    newMessage: Message
    chatRoom: [ChatRoom!]
    testSubscription: String
  }
`;

export default typeDefs;
