import ChatWindow from '../components/chatArea/ChatWindow';
import Navbar from '../components/navbar/navbar';
import Drawer from '../components/drawer/Drawer';
import DrawerContent from '../components/drawer/DrawerContent';
import ProfileButton from '../components/navbar/profileButton';
import DrawerSide from '../components/drawer/DrawerSide';
import DrawerNavbar from '../components/drawer/DrawerNavbar';
import RoomCard from '../components/drawer/RoomCard';
import { useEffect, useState, useRef } from 'react';

import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';
import { ME, GET_CHAT_ROOM } from '../utils/queries';
import { SUBSCRIBE_TO_ROOM } from '../utils/subscriptions';

import avatarImage from '../images/placeholder.jpeg';

export default function Home(props) {

  const [ messages, setMessages ] = useState ([]);
  const [ currentRoom, setCurrentRoom ] = useState ('');
  const [ isChecked, setIsChecked ] = useState (false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }
  

  // listen for the room to change and set the messages
  useEffect (() => {
    async function nothing() {
      try{
        const getMessages = await getChatRoom()
        setMessages(getMessages.data.getChatRoom.messages? getMessages.data.getChatRoom.messages : [] );
      }
      catch (err) {
        console.log('no room selected')
      }
    }
    nothing();
  }, [currentRoom])
  
  useEffect ( () => {}, [messages])
  
  // apollo queries
  const meObj = useQuery(ME);
  const [getChatRoom, getChatRoomResult ] = useLazyQuery(GET_CHAT_ROOM, { variables: { chatRoomId: currentRoom }, fetchPolicy: 'network-only', nextFetchPolicy: 'network-only' });
  const chatRoomSubscription = useSubscription(SUBSCRIBE_TO_ROOM, { variables: { chatRoom: currentRoom } });
  

  
  // monitor the subscription for new messages
  useEffect ( () => {
    if (!chatRoomSubscription.loading) {
      setMessages ( [...messages, chatRoomSubscription.data.subscribeToRoom] );
    }
  }, [chatRoomSubscription])


  
  // send new messages to the server
  function handleSendMessage ( message, username, status ) {
    setMessages ( [...messages, {message, username, status}] );


  }
  

  // set the selected room- which will trigger the useEffect to get and populate the messages
  async function HandleRoomChange(event) {
    setCurrentRoom(event?.currentTarget.id ?? '');
    setIsChecked(false);
  }


  // return a loading 'spinner' if the query is loading
  if (!meObj.data) {
    return <div>Loading...</div>
  }



  return (
    <>
      <Drawer isChecked={isChecked} toggleCheckbox={toggleCheckbox}>
        <DrawerContent>
          <Navbar title={props.title} >
            <ProfileButton />
          </Navbar>

          <ChatWindow currentUser={meObj.data.me.username} messages={messages} sendFunction={handleSendMessage}/>

        </DrawerContent>
        <DrawerSide>
          <DrawerNavbar title={props.title}>

          </DrawerNavbar>
          {meObj.data.me.chat_rooms.map((room) => {
            return (
              <RoomCard key={room._id} roomId={room._id} image={avatarImage} roomName={room.name} handleClick={HandleRoomChange}/>
            )
          }
          )}

        </DrawerSide>
      </Drawer>

    </>
  );
}
