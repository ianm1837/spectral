import React, { useState, useRef } from 'react';

export default function ChatInput (props) {
  const sendBox = useRef(null);

  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    const username = 'ianm1837'
    const status = 'sent'

    setMessage(e.target.value);

    console.log(e.target.id)
    
    if (e.key === 'Enter' || e.button === 'send' && message !== '') {

      props.sendFunction(message, username, status);
      setMessage('');
    } 

  }

  const handleSend = (e) => {
    e.preventDefault();
    const username = 'ianm1837'
    const status = 'sent'

    if (message !== '') {
      props.sendFunction(message, username, status);
      setMessage('');
    }
    sendBox.current.focus();
  }



  return (
    <>

      <div className="flex p-2 w-full h-fit">
        <input ref={sendBox} type="text" value={message} onChange={handleInput} onKeyUp={handleInput} placeholder="Type here" className="input mr-2 input-bordered input-secondary w-full" />
        <button id='send' className="btn btn-square" onClick={handleSend}>
          <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg>
        </button>
      </div>
        
    </>
  );
}
