export default function Drawer(props) {
  return (  
    <div className="drawer drawer-mobile">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        {props.children}
    </div>
  );
}
