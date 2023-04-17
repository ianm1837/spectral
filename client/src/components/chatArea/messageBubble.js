export default function MessageBubble(props) {

  const chatSide = props.side === 'right' ? 'chat-end' : 'chat-start';
  const chatColor = props.side === 'right' ? 'chat-bubble-primary' : 'chat-bubble-secondary';

  return (
    <>
      <div className={`chat ${chatSide}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt='user avatar' src="placeholder.jpeg" />
            </div>
          </div>
          <div className="chat-header">
            {props.username}
            <time className="text-xs opacity-50">&nbsp;{props.sentTime}</time>
          </div>
          <div className={`chat-bubble ${chatColor} flex flex-col object-contain break-words`}>
              {props.message}
          </div>
          <div className="chat-footer opacity-50">
            {props.status}
          </div>
        </div>
    </>
  );}
