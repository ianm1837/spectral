export default function DrawerSide(props) {
  return (  
    <div className="drawer-side h-full">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
      <div className="menu relative h-full w-screen lg:w-96 bg-base-200">
        {props.children}
      </div>
      
    </div>
  );
}
