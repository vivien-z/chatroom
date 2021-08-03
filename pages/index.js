import Head from 'next/head';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import ChatWindow from "../components/ChatWindow";
import useLocalStorage from '../hooks/useLocalStorage';
import { UsersProvider } from "../context/UsersProvider";
import { ChatroomsProvider } from "../context/ChatroomsProvider";
import { SocketProvider } from "../context/SocketProvider";

// import MessageInfo from "../components/MessageInfo";
import Chatrooms from "../components/Chatrooms";
// import MessageHistory from "../components/MessageHistory";
// import MessageInputField from "../components/MessageInputField";
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  // const [socket, setSocket] = useState(null);
  // const [currentUser, setCurrentUser] = useLocalStorage('current-user', null);
  const [myUsername, setMyUsername] = useLocalStorage('my-username');
  const [myId, setMyId] = useLocalStorage('my-id');
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);

  // useEffect(() => {
  //   if (username === undefined) {
  //     setUsernameConfirmed(false)
  //   }
  // }, [isUsernameConfirmed])

  // const [username, setUsername] = useState("");
  // const [message, setMessage] = useState("");
  // const [history, setHistory] = useState([]);

  // const [roomname, setRoomname] = useLocalStorage('roomname');
  // const [chatroom, setChatroom] = useState("");
  // const [chatrooms, setChatrooms] = useState([]);

  // if (!isUsernameConfirmed) {
  //   return (
  //     <SocketProvider className='mt-5' username={username}>
  //       <UsersProvider>
  //         <ChatroomsProvider username={username}>
  //           <LoginForm
  //             value={username}
  //             onChange={(value) => setUsername(value)}
  //             onUsernameSubmit={() => setUsernameConfirmed(true)}
  //           />
  //         </ChatroomsProvider>
  //       </UsersProvider>
  //     </SocketProvider>
  //   )
  // } else {

  // let confirm
  // function logOutConfirm() {
  //   if (typeof confirm === 'function') {
  //     setUsernameConfirmed(!confirm("Are you sure you want to logout?"))
  //   }
  // }

  const navbar = (
    <Navbar
      myUsername={myUsername || null}
      avatarSrc="/favicon.ico"
      onBtnClick={() => setUsernameConfirmed()}
      disabled={!isUsernameConfirmed}
    />
  )
  const chatWindow = <ChatWindow myUsername={myUsername} myId={myId}/>
  const loginForm = (
    <LoginForm
      value={myUsername}
      onChange={(value) => setMyUsername(value)}
      onUsernameSubmit={() => setUsernameConfirmed(true)}
      onIdSubmit={setMyId}
    />
  )

  return (
    <>
      <Head>
        <title>A Chatroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className="d-flex flex-column vh-100">
        {/*{isUsernameConfirmed ? null : navbar}*/}
        <Row>{navbar}</Row>
        <Row className="flex-grow-1 overflow-auto">
          <SocketProvider className='mt-5' myUsername={myUsername} myId={myId}>
            <UsersProvider myUsername={myUsername} myId={myId}>
              <ChatroomsProvider myUsername={myUsername} myId={myId}>
                {isUsernameConfirmed ? chatWindow : <></>}
                {isUsernameConfirmed ? <></> : loginForm}
              </ChatroomsProvider>
            </UsersProvider>
          </SocketProvider>
        </Row>
      </Container>
    </>
  )
}


  // const connectSocket = () => {
  //   fetch("/api/chat");

  //   if (!socket) {
  //     const newSocket = io();

  //     newSocket.on("connect", () => {
  //       console.log("Chat app connected");
  //     });

  //     newSocket.on("message", (msg) => {
  //       setHistory((history) => [...history, msg]);
  //     });

  //     newSocket.on("chatroom", (chatrm) => {
  //       console.log(chatrm);
  //       setChatrooms((chatrooms) => [...chatrooms, chatrm]);
  //     });

  //     newSocket.on("disconnect", () => {
  //       console.warn("WARNING: chat app disconnected");
  //     });

  //     setSocket(() => newSocket);
  //   }
  // };

  // useEffect(() => {
  //   connectSocket();
  // }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // const formName = e.target.querySelector('input').getAttribute('name')1
  //   // console.log(Chatrooms);
  //   // console.log(chatroom);
  //   if (!socket) {
  //     alert("Chatroom not connected yet. Try again in a little bit.");
  //     return;
  //   }
  //   // if (formName === "message") {
  //     // prevent empty submissions
  //     if (!message || !isUsernameConfirmed) {
  //       return;
  //     }
  //     // submit and blank-out the field.
  //     socket.emit("message-submitted", { message, username });
  //     setMessage("");
  //   // }
  //   // if (formName === "chatroom" ) {
  //   //   // console.log(chatroom)
  //   //   socket.emit("chatroom-created", chatroom);
  //   //   setChatroom("");
  //   // }
  // };
