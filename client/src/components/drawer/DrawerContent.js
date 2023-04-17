export default function DrawerContent(props) {
  return (  
      <div className="drawer-content flex flex-col h-screen">
        {props.children}
      </div>
  );
}
