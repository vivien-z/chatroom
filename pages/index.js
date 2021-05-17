import Head from 'next/head';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Navbar from "../components/Navbar";
import UsernameForm from "../components/UsernameForm";
import ChatWindow from "../components/ChatWindow";
import useLocalStorage from '../hooks/useLocalStorage';
import { UsersProvider } from "../context/UsersProvider";
import { ChatroomsProvider } from "../context/ChatroomsProvider";
import { SocketProvider } from "../context/SocketProvider";

// import MessageInfo from "../components/MessageInfo";
import Chatrooms from "../components/Chatrooms";
import ChatroomInputField from "../components/ChatroomInputField";
// import MessageHistory from "../components/MessageHistory";
// import MessageInputField from "../components/MessageInputField";

export default function Home() {
  // const [socket, setSocket] = useState(null);
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);
  // const [currentUser, setCurrentUser] = useLocalStorage('current-user', null);
  const [username, setUsername] = useLocalStorage('username');

  // const [username, setUsername] = useState("");
  // const [message, setMessage] = useState("");
  // const [history, setHistory] = useState([]);

  // const [roomname, setRoomname] = useLocalStorage('roomname');
  // const [chatroom, setChatroom] = useState("");
  // const [chatrooms, setChatrooms] = useState([]);

  if (!isUsernameConfirmed) {
    return (
      <SocketProvider className='mt-5' username={username}>
        <UsersProvider>
          <ChatroomsProvider username={username}>
            <UsernameForm
              value={username}
              onChange={(value) => setUsername(value)}
              onUsernameSubmit={() => setUsernameConfirmed(true)}
            />
          </ChatroomsProvider>
        </UsersProvider>
      </SocketProvider>
    )
  } else {
  return (
    <div>
      <Head>
        <title>2chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
  {/*      <Navbar
          value={null || username}
          avatarSrc="/favicon.ico"
          disabled={!isUsernameConfirmed}
        />*/}
        <div>
          <SocketProvider className='mt-5' username={username}>
            <UsersProvider>
              <ChatroomsProvider username={username}>
                <ChatWindow username={username}/>
              </ChatroomsProvider>
            </UsersProvider>
          </SocketProvider>
        </div>
      </div>
    </div>
  )};
};


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
