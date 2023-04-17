import { useRef, useEffect } from 'react';

export default function Drawer(props) {


  return (  
    <div className="drawer drawer-mobile">
      <input id="my-drawer-3" type="checkbox" checked={props.isChecked} onChange={props.toggleCheckbox} className="drawer-toggle"  />
        {props.children}
    </div>
  );
}
