import DrawerToggle from "../navbar/drawerToggle";

export default function Navbar(props) {
  return (
    <>
      <div className="w-full navbar bg-base-300">
        <DrawerToggle />
        <div className="flex-1 px-2 mx-2 hidden lg:block ">
          <a className="btn btn-ghost normal-case text-xl">
            {props.title}
          </a>
        </div>
        {props.children}
      </div>
    </>
  );
}
