export default function MessageBubble(props) {
  return (
    <>
      <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="placeholder.jpeg" />
            </div>
          </div>
          <div className="chat-header">
            {props.username}
            <time className="text-xs opacity-50">&nbsp;{props.sentTime}</time>
          </div>
          <div className="chat-bubble chat-bubble-primary">{props.message}</div>
          <div className="chat-footer opacity-50">
            {props.status}
          </div>
        </div>
    </>
  );}
