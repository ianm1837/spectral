export default function RoomCard(props) {
  return (  
    <a id={props.roomId} className="card w-auto m-3 mb-0 active:bg-base-100 btn-ghost bg-base-100 shadow-xl" onClick={props.handleClick}>
      <div className="card-body">
        <div className="flex flex-row items-center"> 
          <div className='w-12 '>
            <img alt='' className="rounded-full" src={props.image} />
          </div>
          <h4 className="ml-3 text-lg font-semibold">{props.roomName}</h4>
        </div>
      </div>
    </a>
  );
}