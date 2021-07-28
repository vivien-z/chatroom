import { useState } from "react";
import Chatrooms from "../components/Chatrooms";
import Users from "../components/Users";
import NewChatroomModal from "../components/NewChatroomModal";
import NewUserModal from "../components/NewUserModal";
// import Tab from 'react-bootstrap/Tab';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { Tab, Nav, Button, Modal, Row, Col } from 'react-bootstrap';
import styles from '../styles/ChatWindowSidebar.module.scss';

const CHATROOMS_KEY = "chatrooms"
const USERS_KEY = "users"

const ChatWindowSidebar = ({ username }) => {
  const [activeKey, setActiveKey] = useState(CHATROOMS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  // const [isChatroomActive, set]

  const btnName = activeKey === CHATROOMS_KEY ? "Chatroom" : "Contact"
  // const chatrooms = <FontAwesomeIcon icon={faComments} />
  // const contacts = <FontAwesomeIcon icon={faUserFriends} />

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '250px'}} className='d-flex flex-column'>

      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Row className="h-100">
          <Col sm={3} className={`${styles.navTab} pt-4 bg-primary h-100 my-1`}>
            <Nav variant="pills" className="justify-content-center align-items-start">
              <Nav.Item className="mb-2">
                <Nav.Link eventKey={CHATROOMS_KEY}>Crm</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-2">
                <Nav.Link eventKey={USERS_KEY}>Ur</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="px-0 pl-1 h-100">
            <div className='d-flex flex-column py-1 bg-gray-l h-100'>
              <p className={`${styles.tabTitle}`}>{btnName}</p>
              <Tab.Content className='overflow-auto flex-grow-1'>
                <Tab.Pane eventKey={CHATROOMS_KEY}>
                  <Chatrooms />
                </Tab.Pane>
                <Tab.Pane eventKey={USERS_KEY}>
                  <Users />
                </Tab.Pane>
              </Tab.Content>
              <Button
                className={`${styles.buttom} align-items-end w-100`}
                onClick={()=>setModalOpen(true)}
              >
                New {btnName}
              </Button>
            </div>
          </Col>
        </Row>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === "chatrooms" ?
          <NewChatroomModal closeModal={closeModal}/> :
          <NewUserModal closeModal={closeModal}/>
        }
      </Modal>

    </div>
  )
}
//       <div className='p-2 small'>
//         User: <span className='text-muted'>{username}</span>
//         Room: <span className='text-muted'>{roomname}</span>
//       </div>
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

export default ChatWindowSidebar;
