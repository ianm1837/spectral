import MessageBubble from "./MessageBubble";
import { useEffect, useState } from "react";

export default function BubbleContainer(props) {

  
  const [messagesArr, setMessagesArr] = useState ([]);
  
  useEffect ( () => {
    console.log ( props.messages );
    setMessagesArr ( props.messages.map ( (message, index) => {
      return (
        <MessageBubble 
          key = { index }
          username = { message.username }
          message = { message.message }
          status = { message.status }
        />
      );
    }
    ));
  }, [props.messages]);


  return (
    <>
      <div className={`w-full h-full bg-base-100 flex flex-col justify-end`}>

        {messagesArr}
        
      </div>
    </>
  );
}
