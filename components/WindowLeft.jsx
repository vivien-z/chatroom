import { useState } from "react";
import { io } from "socket.io-client";

import Chatrooms from "../components/Chatrooms";
import Contacts from "../components/Contacts";
import NewChatroomModal from "../components/NewChatroomModal";
import NewContactModal from "../components/NewContactModal";
// import MessageInputField from "../components/MessageInputField";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../styles/Home.module.css';

const CHATROOMS_KEY = "chatrooms"
const CONTACTS_KEY = "contacts"

const WindowLeft = ({ username, roomname }) => {
  const [activeKey, setActiveKey] = useState(CHATROOMS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  // const [isChatroomActive, set]

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '250px'}} className='d-flex flex-column'>

      <Tab.Container
        activeKey={activeKey}
        onSelect={setActiveKey}>
        <Nav variant="tabs" className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={CHATROOMS_KEY}>Chatrooms</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          className='overflow-auto flex-grow-1'
          >
          <Tab.Pane eventKey={CHATROOMS_KEY}>
            <Chatrooms />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 small border-top'>
          User: <span className='text-muted'>{username}</span>
          Room: <span className='text-muted'>{roomname}</span>
        </div>
        <Button
          className='rounded-0'
          onClick={()=>setModalOpen(true)}
          >
          New {activeKey}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === "chatrooms" ?
          <NewChatroomModal closeModal={closeModal}/> :
          <NewContactModal closeModal={closeModal}/>
        }
      </Modal>

    </div>
  )
}
// const ChatWindow = ({ type, name, value, avatarSrc, onChange, onSubmit, placeholder, disabled }) => {
//   const [socket, setSocket] = useState(null);
//   const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);

//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const [history, setHistory] = useState([]);
//   const [chatroom, setChatroom] = useState("");
//   const [chatrooms, setChatrooms] = useState([]);

//   const connectSocket = () => {
//     // prime the server first. yes, this is an extra call and is inefficient.
//     // but we're using NextJS for convenience, so this is a necessary evil.
//     fetch("/api/chat");
//     // after making sure that socket server is primed, connect to it.

//     if (!socket) {
//       const newSocket = io();

//       newSocket.on("connect", () => {
//         console.log("Chat app connected");
//       });

//       newSocket.on("message", (msg) => {
//         setHistory((history) => [...history, msg]);
//       });

//       newSocket.on("chatroom", (chatroom) => {
//         setChatrooms((chatrooms) => [...chatrooms, chatroom]);
//       });

//       // Logs when server disconnects
//       newSocket.on("disconnect", () => {
//         console.warn("WARNING: chat app disconnected");
//       });

//       setSocket(() => newSocket);
//     }
//   };

//   // The websocket code
//   useEffect(() => {
//     connectSocket();
//   }, []);

//   // this method submits the form and sends the message to the server.
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!socket) {
//       alert("Chatroom not connected yet. Try again in a little bit.");
//       return;
//     }

//     // prevent empty submissions
//     if (!message || !isUsernameConfirmed) {
//       return;
//     }

//     if (!chatroom) {
//       return;
//     }

//     // submit and blank-out the field.
//     socket.emit("message-submitted", { message, username });
//     setMessage("");
//     socket.emit("chatroom-created", { chatroom });
//     setChatroom("");
//   };

//   if (!isUsernameConfirmed) {
//     return (
//       <div className={ styles.windowSetup }>
//         <UsernameField
//           // className={styles.window}
//           completed={isUsernameConfirmed}
//           value={username}
//           avatarSrc="/favicon.ico"
//           onChange={(value) => setUsername(value)}
//           onSubmit={() => setUsernameConfirmed(true)}
//           placeholder={"Set username..."}
//         />
//       </div>
//     );
//   } else {
//     return (
//       <div className={styles.window}>
//         <div className={styles.windowChatLeft}>
//           <ChatroomsList
//             value={{chatroom, chatrooms}}
//             onChange={(value) => setChatroom(value)}
//             onSubmit={(e) => handleSubmit(e)}
//             placeholder={"..."}
//           />
//         </div>
//         <div className={styles.windowChatRight}>
//           <UsernameField
//             completed={isUsernameConfirmed}
//             value={username}
//             avatarSrc="/favicon.ico"
//             onChange={(value) => setUsername(value)}
//             onSubmit={() => setUsernameConfirmed(true)}
//             placeholder={"Set username..."}
//           />

//           <MessageHistory
//             value={history}
//           />

//           <MessageInputField
//             onSubmit={(e) => handleSubmit(e)}
//             type="text"
//             name="message"
//             value={message}
//             avatarSrc="/favicon.ico"
//             onChange={(value) => setMessage(value)}
//             placeholder={ "Enter your message..."
//               // username ? "Enter your message..." : "Set username..."
//             }
//             disabled={!isUsernameConfirmed}
//           />
//         </div>
//       </div>
//     );
//   }
// };

export default WindowLeft;
