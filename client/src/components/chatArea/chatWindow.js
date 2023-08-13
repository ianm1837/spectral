import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./messageBubble";

export default function ChatWindow(props) {

  const sendBox = useRef(null);
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState('');
  const [messagesArr, setMessagesArr] = useState ([]);

  useEffect ( () => {
    setMessagesArr ( props.messages.map ( (message, index) => {
      const leftOrRight = message?.user.username === props.currentUser ? 'right' : 'left';
      return (
        <MessageBubble 
          key = { index }
          username = { message?.user?.username ?? 'no user' }
          message = { message.message }
          status = { message.status }
          side = { leftOrRight }
        />
      );
    }
    ));
  }, [props.messages]);

  useEffect ( () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messagesArr]);

  function sendMessage(){
    const user = {}
    user.username = props.currentUser
    const status = 'sent'

    if (message !== '') {
      props.sendFunction(message, user, status);
      setMessage('');
    }
    sendBox.current.focus();
  }

  const handleInput = (e) => {

    setMessage(e.target.value);
    
    if (e.key === 'Enter') {
      sendMessage()
      sendBox.current.focus();
    } 
  }

  const handleSend = (e) => {
    e.preventDefault();

    sendMessage()
    sendBox.current.focus();
  }

  return (
    <>
      <div className={`pr-5 pl-5 grid grid-cols-1 grid-rows-1 w-full h-full bg-base-100 overflow-y-auto`}>
        <div className="mt-auto w-full">
          {messagesArr}
        <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex p-2 w-full h-fit">
        <input ref={sendBox} type="text" value={message} onChange={handleInput} onKeyUp={handleInput} placeholder="Type here" className="input mr-2 input-bordered input-secondary w-full" />
        <button id='send' className="btn btn-square" onClick={handleSend}>
          <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg>
        </button>
      </div>
    </>
  );
}
