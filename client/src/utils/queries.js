import { gql } from '@apollo/client';

export const GET_ALL_CHAT_ROOMS = gql`
  query GetAllChatRooms {
  getAllChatRooms {
    _id
    name
    users {
      _id
      username
    }
  }
}`

export const GET_CHAT_ROOM = gql`
query GetChatRoom($chatRoomId: ID!) {
  getChatRoom(chatRoomId: $chatRoomId) {
    name
    users {
      _id
      username
    }
    messages {
      _id
      user {
        _id
        username
      }
      created_at
      message
    }
    _id
  }
}`

export const GET_ALL_USERS = gql`
query GetAllUsers {
  getAllUsers {
    _id
    total_messages
    username
  }
}`

export const ME = gql`
query Me {
  me {
    _id
    chat_rooms {
      _id
      messages {
        _id
        created_at
        message
        user {
          _id
          username
        }
      }
      name
      users {
        _id
        username
      }
    }
    username
    total_messages
    theme
    last_open_room {
      _id
      name
    }
    last_message_time
  }
}`