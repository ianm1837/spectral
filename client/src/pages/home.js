import ChatWindow from '../components/chatArea/ChatWindow';
import Navbar from '../components/navbar/navbar';
import Drawer from '../components/drawer/Drawer';
import DrawerContent from '../components/drawer/DrawerContent';
import ProfileButton from '../components/navbar/profileButton';
import DrawerSide from '../components/drawer/DrawerSide';
import DrawerNavbar from '../components/drawer/DrawerNavbar';
import RoomCard from '../components/drawer/RoomCard';
import MessageOptions from '../components/navbar/messageOptions'
import CreateRoomModal from '../components/modals/CreateRoom';
import InviteUserModal from '../components/modals/InviteUser';
import ProfileModal from '../components/modals/Profile';
import SettingsModal from '../components/modals/Settings';
import RenameRoomModal from '../components/modals/RenameRoom';
import LeaveRoomModal from '../components/modals/LeaveRoom';
import JoinRoomModal from '../components/modals/JoinRoom';

import { useEffect, useState, useRef } from 'react';

import { useQuery, useLazyQuery, useSubscription, useMutation } from '@apollo/client';
import { ME, GET_CHAT_ROOM } from '../utils/queries';
import { SUBSCRIBE_TO_ROOM } from '../utils/subscriptions';
import { POST_MESSAGE } from '../utils/mutations';

import avatarImage from '../images/placeholder.jpeg';

export default function Home(props) {

  const [ messages, setMessages ] = useState ([]);
  const [ currentRoom, setCurrentRoom ] = useState ('');
  const [ isChecked, setIsChecked ] = useState (false);
  const [ roomEditName, setRoomEditName ] = useState ('');
  const [ updateRoomStatus, setUpdateRoomStatus ] = useState (false);

  // useEffect ( () => {
  //   console.log('roomEditName: ', roomEditName)
  // }, [roomEditName])

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
        console.info('no room selected')
      }
    }
    nothing();
  }, [currentRoom])
  
  useEffect ( () => {}, [messages])

  useEffect ( () => {
    meObj.refetch();
  }, [updateRoomStatus])
  
  // apollo queries
  const meObj = useQuery(ME);

  const [getChatRoom, getChatRoomResult ] = useLazyQuery(GET_CHAT_ROOM,{ 
    variables: { 
      chatRoomId: currentRoom 
    }, 
    fetchPolicy: 'network-only', 
    nextFetchPolicy: 'network-only' 
    }
  );

  const chatRoomSubscription = useSubscription(SUBSCRIBE_TO_ROOM, { 
    variables: { 
      chatRoom: currentRoom 
    }
  });
        
  const [postMessage, postMessageResult] = useMutation(POST_MESSAGE, {
    variables: { 
      chatRoom: currentRoom 
    }
  });
  

  
  // monitor the subscription for new messages
  useEffect ( () => {
    if (!chatRoomSubscription.loading) {
      if(chatRoomSubscription.data.subscribeToRoom.user.username === meObj.data.me.username) {
        return;
      }
      setMessages ( [...messages, chatRoomSubscription.data.subscribeToRoom] );
    }
  }, [chatRoomSubscription])


  
  // send new messages to the server
  function handleSendMessage ( message, user, status ) {
    setMessages ( [...messages, {message, user, status}] );
    postMessage({ variables: { messageText: message, chatRoom: currentRoom } });
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
            <MessageOptions />
          </DrawerNavbar>
          {meObj.data.me.chat_rooms.map((room) => {
            return (
              <RoomCard key={room.chat_room} roomId={room.chat_room} image={avatarImage} roomName={room.room_name} editRoomFunction={setRoomEditName} handleClick={HandleRoomChange}/>
            )
          }
          )}
          

        </DrawerSide>
      </Drawer>
      <CreateRoomModal setUpdateRoomStatus={setUpdateRoomStatus} updateRoomStatus={updateRoomStatus} />
      <InviteUserModal roomName={roomEditName} setUpdateRoomStatus={setUpdateRoomStatus} updateRoomStatus={updateRoomStatus} />
      <SettingsModal />
      <RenameRoomModal roomName={roomEditName} setUpdateRoomStatus={setUpdateRoomStatus} updateRoomStatus={updateRoomStatus}/>
      <LeaveRoomModal roomName={roomEditName} setUpdateRoomStatus={setUpdateRoomStatus} updateRoomStatus={updateRoomStatus}/>
      <JoinRoomModal setUpdateRoomStatus={setUpdateRoomStatus} updateRoomStatus={updateRoomStatus}/>


    </>
  );
}
