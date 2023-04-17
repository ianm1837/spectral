import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      chat_rooms {
        _id
        name
      }
      username
      total_messages
      theme
      last_open_room {
        _id
        name
      }
    }
  }
}`

export const ADD_CHAT_ROOM = gql`
mutation AddChatRoom($name: String!) {
  addChatRoom(name: $name) {
    _id
    name
  }
}`

export const ADD_USER_TO_ROOM = gql`
mutation AddUserToRoom($chatRoomId: ID!, $userId: String!) {
  addUserToRoom(chatRoomId: $chatRoomId, user_id: $userId) {
    name
  }
}`

export const POST_MESSAGE = gql`
  mutation PostMessage($messageText: String!, $chatRoom: String!) {
  postMessage(message_text: $messageText, chat_room: $chatRoom) {
    _id
  }
}`
