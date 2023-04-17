import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CHAT_ROOM, ADD_USER_TO_ROOM } from '../../utils/mutations'


export default function JoinRoomModal(props){

  const [roomNameField, setRoomNameField] = useState('')
  const [roomId, setRoomId] = useState('')
  const [addUserToRoom, { error }] = useMutation(ADD_USER_TO_ROOM)

  const handleAddUserToRoom = async () => {
    if (roomId === '' || roomNameField === '') return alert('Please enter a room id and name.')

    try {
      const { data } = await addUserToRoom({
        variables: { chatRoomId: roomId, roomName: roomNameField },
      })
      props.setUpdateRoomStatus(!props.updateRoomStatus)
      setRoomNameField('')
    } catch (err) {
      console.error(err)
    }
  }
  
  const handleInputIdChange = (event) => {
    setRoomId(event.target.value)
  }
  
  const handleInputNameChange = (event) => {
    setRoomNameField(event.target.value)
  }

  return(
    <>
      <input type="checkbox" id="joinRoomModal" className="modal-toggle" />
      <label htmlFor='joinRoomModal' className="modal modal-bottom sm:modal-middle">
        <label htmlFor='' className="modal-box">
          <div className='flex flex-col items-center'>
            <div className='w-80'>
              <h3 className="font-bold text-lg">Join Chat Room</h3>
              <input type="text" onChange={handleInputIdChange} value={roomId} placeholder="Enter Room Id" className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <input type="text" onChange={handleInputNameChange} value={roomNameField} placeholder="Enter Room Name" className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <div className="modal-action">
                <div className='flex w-full justify-between items-center'>
                  <label className='link link-secondary' htmlFor="joinRoomModal" >Cancel</label>
                  <label htmlFor="joinRoomModal" onClick={handleAddUserToRoom} className="btn">Join</label>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}
