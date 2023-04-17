const { gql } = require('@apollo/client');

export const SUBSCRIBE_TO_ROOM = gql`
subscription SubscribeToRoom($chatRoom: String!) {
  subscribeToRoom(chat_room: $chatRoom) {
    _id
    message
    user {
      username
      _id
    }
    created_at
  }
}`