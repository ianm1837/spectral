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
      username
      chat_rooms {
        chat_room
        room_name
      }
      last_open_room {
        _id
      }
      last_message_time
      total_messages
      theme
    }
  }
}`

export const CHANGE_PASSWORD = gql`
mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    user {
      _id
    }
  }
}`

export const ADD_CHAT_ROOM = gql`
mutation AddChatRoom($name: String!) {
  addChatRoom(name: $name) {
    _id
  }
}`

export const RENAME_CHAT_ROOM = gql`
mutation RenameChatRoom($name: String!, $chatRoomId: ID!) {
  renameChatRoom(name: $name, chatRoomId: $chatRoomId) {
    _id
  }
}`

export const DELETE_CHAT_ROOM = gql`
mutation DeleteChatRoom($chatRoomId: ID!) {
  deleteChatRoom(chatRoomId: $chatRoomId) {
    _id
  }
}`

export const ADD_USER_TO_ROOM = gql`
mutation AddUserToRoom($chatRoomId: ID!, $roomName: String!) {
  addUserToRoom(chatRoomId: $chatRoomId, roomName: $roomName) {
    _id
  }
}`

export const POST_MESSAGE = gql`
  mutation PostMessage($messageText: String!, $chatRoom: String!) {
  postMessage(message_text: $messageText, chat_room: $chatRoom) {
    _id
  }
}`
