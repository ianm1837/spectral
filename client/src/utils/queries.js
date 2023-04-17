import { gql } from '@apollo/client';

export const GET_ALL_CHAT_ROOMS = gql`
  query GetAllChatRooms {
  getAllChatRooms {
    _id
    users {
      _id
      username
    }
  }
}`

export const GET_CHAT_ROOM = gql`
query GetChatRoom($chatRoomId: ID!) {
  getChatRoom(chatRoomId: $chatRoomId) {
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
      chat_room
      room_name
    }
    last_message_time
    last_open_room {
      _id
    }
    theme
    total_messages
    username
  }
}`