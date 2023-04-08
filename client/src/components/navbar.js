export default function Navbar() {
  return (
    <>
      <div className='w-full navbar bg-base-300'>
        <div className='flex-none lg:hidden'>
          {' '}
          {/* Mobile menu button */}
          <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-6 h-6 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </label>
        </div>
        <div className='flex-1 px-2 mx-2'></div>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src='placeholder.jpeg' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='drawer drawer-mobile'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        {/* <div className='drawer-content flex flex-col'></div> */}
        <div className='drawer-side '>
          <label htmlFor='my-drawer-3' className='drawer-overlay' />
          <ul className='menu p-4 bg-base-100'>
            {/* <div className='flex-none lg:hidden'> 
            <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
              <svg
                fill='#fff'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M13.414 12l4.95-4.95a1 1 0 0 0-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 0 0 5.636 7.05l4.95 4.95-4.95 4.95a1 1 0 0 0 1.414 1.414l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414-1.414z' />
              </svg>
            </label>
          </div> */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
