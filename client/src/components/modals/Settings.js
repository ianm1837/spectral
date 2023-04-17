import { CHANGE_PASSWORD } from "../../utils/mutations"
import { useMutation } from "@apollo/client"
import { useState } from "react"

export default function SettingsModal(props){

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [changePassword, { error }] = useMutation(CHANGE_PASSWORD)

  const handleChangePassword = async () => {
    try {
      await changePassword({
        variables: { oldPassword: oldPassword, newPassword: newPassword },
      })
      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      console.error(err)
      console.log(error)
    }
  }

  const handleOldPasswordInputChange = (event) => {
    setOldPassword(event.target.value)
  }

  const handleNewPasswordInputChange = (event) => {
    setNewPassword(event.target.value)
  }

  return(
    <>
      <input type="checkbox" id="settingsModal" className="modal-toggle" />
      <label htmlFor='settingsModal' className="modal modal-bottom sm:modal-middle">
        <label htmlFor='' className="modal-box">
          <div className='flex flex-col items-center'>
            <div className='w-80'>
              <h3 className="font-bold text-lg">Change Password</h3>
              <input type="text" value={oldPassword} onChange={handleOldPasswordInputChange} placeholder="Old Password" className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <input type="text" value={newPassword} onChange={handleNewPasswordInputChange} placeholder="New Password" className="input input-bordered mt-3 input-secondary w-full max-w-xs" />
              <div className="modal-action">
                <div className='flex w-full justify-between items-center'>
                  <label className='link link-secondary' htmlFor="settingsModal" >Cancel</label>
                  <label htmlFor="settingsModal" onclick={handleChangePassword} className="btn">Save</label>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}
