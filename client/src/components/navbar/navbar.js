import DrawerToggle from "./drawerToggle";

export default function Navbar(props) {
  return (
    <>
      <div className="w-full navbar bg-base-300 flex lg:flex-row-reverse">
        <DrawerToggle/>
        <div className="flex-1 px-2 mx-2 block lg:hidden w-fit ">
          <a className="btn btn-ghost normal-case text-xl w-full">
            {props.title}
          </a>
        </div>
        {props.children}
      </div>
    </>
  );
}
