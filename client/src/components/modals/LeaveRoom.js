import { useMutation } from '@apollo/client'
import { DELETE_CHAT_ROOM } from '../../utils/mutations'


export default function LeaveRoomModal(props){

  const [deleteChatRoom, { error }] = useMutation(DELETE_CHAT_ROOM)

  const leaveRoom = async () => {
    try {
      await deleteChatRoom({
        variables: { chatRoomId: props.roomName },
      })
      props.setUpdateRoomStatus(!props.updateRoomStatus)
    } catch (err) {
      console.error(err)
      console.log(error)
    }
  }

  return(
    <>
      <input type="checkbox" id="leaveRoomModal" className="modal-toggle" />
      <label htmlFor='leaveRoomModal' className="modal modal-bottom sm:modal-middle">
        <label htmlFor='' className="modal-box">
          <div className='flex flex-col items-center'>
            <div className='w-80'>
              <h3 className="font-bold text-lg">Delete Room?</h3>
              <div className="modal-action">
                <div className='flex w-full justify-between items-center'>
                  <label className='link link-secondary' htmlFor="leaveRoomModal" >Cancel</label>
                  <label htmlFor="leaveRoomModal" onClick={leaveRoom} className="btn btn-error">Delete</label>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}
