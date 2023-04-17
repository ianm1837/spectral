import AuthServices from '../../utils/auth';

export default function ProfileButton(props) {

  function handleLogout() {
    AuthServices.logout();
  }




  return (
    <>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-9 rounded-full'>
              <img src='placeholder.jpeg' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <label htmlFor='settingsModal'>Settings</label>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
    </>
  );
}
