import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { RENAME_CHAT_ROOM } from '../../utils/mutations'


export default function RenameRoomModal(props){

  const [roomNameField, setRoomNameField] = useState('')
  const [addChatRoom, { error }] = useMutation(RENAME_CHAT_ROOM)

  const renameRoom = async () => {
    try {
      await addChatRoom({
        variables: { name: roomNameField, chatRoomId: props.roomName },
      })
      props.setUpdateRoomStatus(!props.updateRoomStatus)
      setRoomNameField('')
    } catch (err) {
      console.error(err)
      console.log(error)
    }
  }

  const handleInputChange = (event) => {
    setRoomNameField(event.target.value)
  }


  return(
    <>
      <input type="checkbox" id="renameRoomModal" className="modal-toggle" />
      <label htmlFor='renameRoomModal' className="modal modal-bottom sm:modal-middle">
        <label htmlFor='' className="modal-box">
          <div className='flex flex-col items-center'>
            <div className='w-80'>
              <h3 className="font-bold text-lg">Create new Chat</h3>
              <input type="text" placeholder="Enter Room Name" value={roomNameField} onChange={handleInputChange} className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <div className="modal-action">
                <div className='flex w-full justify-between items-center'>
                  <label className='link link-secondary' htmlFor="renameRoomModal" >Cancel</label>
                  <label htmlFor="renameRoomModal" className="btn" onClick={renameRoom}>Create</label>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}

