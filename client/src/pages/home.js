import ChatWindow from '../components/chatArea/ChatWindow';
import Navbar from '../components/navbar/navbar';
import Drawer from '../components/drawer/Drawer';
import DrawerContent from '../components/drawer/DrawerContent';
import ProfileButton from '../components/navbar/profileButton';
import DrawerSide from '../components/drawer/DrawerSide';
import DrawerNavbar from '../components/drawer/DrawerNavbar';


export default function Home(props) {
  return (
    <>
      <Drawer>
        <DrawerContent>
          <Navbar title={props.title}>
            <ProfileButton />
          </Navbar>

          <ChatWindow />

        </DrawerContent>
        <DrawerSide>
          <DrawerNavbar title={props.title}>

          </DrawerNavbar>
          <h1>Yeah, stuff</h1>
        </DrawerSide>
      </Drawer>

    </>
  );
}
