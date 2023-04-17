export default function CreateRoomModal(){
  return(
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <label htmlFor='my-modal-6' className="modal modal-bottom sm:modal-middle">
        <label htmlFor='' className="modal-box">
          <div className='flex flex-col items-center'>
            <div className='w-80'>
              <h3 className="font-bold text-lg">Create new Chat</h3>
              <input type="text" placeholder="Enter Room Name" className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <div className="modal-action">
                <div className='flex w-full justify-between items-center'>
                  <label className='link link-secondary' htmlFor="my-modal-6" >Cancel</label>
                  <label htmlFor="my-modal-6" className="btn">Create</label>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}
