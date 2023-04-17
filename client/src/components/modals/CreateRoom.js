import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CHAT_ROOM } from '../../utils/mutations'


export default function CreateRoomModal(props){

  const [roomNameField, setRoomNameField] = useState('')
  const [addChatRoom, { error }] = useMutation(ADD_CHAT_ROOM)

  const createRoom = async () => {
    try {
      await addChatRoom({
        variables: { name: roomNameField },
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
      <input type="checkbox" id="createRoomModal" className="modal-toggle" />
      <label htmlFor='createRoomModal' className="modal modal-bottom sm:modal-middle">
        <label htmlFor='' className="modal-box">
          <div className='flex flex-col items-center'>
            <div className='w-80'>
              <h3 className="font-bold text-lg">Create new Chat</h3>
              <input type="text" onChange={handleInputChange} value={roomNameField} placeholder="Enter Room Name" className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <div className="modal-action">
                <div className='flex w-full justify-between items-center'>
                  <label className='link link-secondary' htmlFor="createRoomModal" >Cancel</label>
                  <label htmlFor="createRoomModal" onClick={createRoom} className="btn">Create</label>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}
