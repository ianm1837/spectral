export default function DrawerSide(props) {
  return (  
    <div className="drawer-side  ">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
      <ul className="menu w-screen lg:w-80 bg-base-200">
        {props.children}
      </ul>
      
    </div>
  );
}
