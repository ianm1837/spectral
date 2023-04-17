export default function InviteUserModal(props){

  return(
    <>
      <input type="checkbox" id="inviteUserModal" className="modal-toggle" />
      <label htmlFor='inviteUserModal' className="modal modal-bottom sm:modal-middle">
        <label htmlFor='' className="modal-box">
          <div className='flex flex-col items-center'>
            <div className='w-80'>
              <h3 className="font-bold text-lg">Copy and share this ID:</h3>
              <input type="text" value={props.roomName} readOnly className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <div className="modal-action">
                  <label htmlFor="inviteUserModal" className="btn">done</label>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}
