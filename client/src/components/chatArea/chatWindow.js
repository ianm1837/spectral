import MessageInput from "./MessageInput";
import BubbleContainer from "./BubbleContainer";
import React, { useState } from "react";

export default function ChatWindow(props) {

  const [ messages, setMessages ] = useState ([]);



  function sendFunction ( message, username, status ) {

    setMessages ( [...messages, {message, username, status}] );
    
    console.log ( messages );
  }
  

  return (
    <>
      <BubbleContainer 
        messages = { messages }
      />

      <MessageInput 
        sendFunction = { sendFunction }
      />
    </>
  );
}


