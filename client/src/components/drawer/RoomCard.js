export default function RoomCard(props) {

  function handleClick(event) {
    event.stopPropagation();
  }

  function findTheElement(event) {
    event.stopPropagation();
    props.editRoomFunction(event.target.id);
  }

  return (  
    <label id={props.roomId} className="card w-auto m-3 mb-0 active:bg-base-100 btn-ghost bg-base-100 shadow-xl" onClick={props.handleClick}>
      <div className="card-body">
        <div className="flex flex-row items-center"> 
          <div className='w-12 '>
            <img alt='' className="rounded-full" src={props.image} />
          </div>
          <h4 className="ml-3 text-lg font-semibold">{props.roomName}</h4>

          <div className="grow">&nbsp;</div>
          <div className="dropdown dropdown-bottom dropdown-end">
          <label onClick={handleClick} tabIndex={0} className="btn btn-ghost btn-circle avatar m-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"/></svg>  
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><label id={props.roomId} htmlFor="inviteUserModal" onClick={findTheElement}>Invite User</label></li>
            <li><label id={props.roomId} htmlFor="renameRoomModal" onClick={findTheElement}>Rename Room</label></li>
            <li><label id={props.roomId} htmlFor="leaveRoomModal" onClick={findTheElement}>Leave Room</label></li>
          </ul>
        </div>
        </div>
      </div>
    </label>
  );
}