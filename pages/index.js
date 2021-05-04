import Head from 'next/head';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import UsernameField from "../components/UsernameField";
import UsernameForm from "../components/UsernameForm";
import ChatroomInputField from "../components/ChatroomInputField";
import RoomList from "../components/RoomList";
import MessageHistory from "../components/MessageHistory";
import MessageInputField from "../components/MessageInputField";
import styles from '../styles/Home.module.css';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);

  // const [username, setUsername] = useState("");
  const [username, setUsername] = useLocalStorage('username');
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [chatroom, setChatroom] = useState("");
  const [rooms, setRooms] = useState([]);

  const connectSocket = () => {
    fetch("/api/chat");

    if (!socket) {
      const newSocket = io();

      newSocket.on("connect", () => {
        console.log("Chat app connected");
      });

      newSocket.on("message", (msg) => {
        setHistory((history) => [...history, msg]);
      });

      newSocket.on("chatroom", (chatrm) => {
        console.log(chatrm);
        setRooms((rooms) => [...rooms, chatrm]);
      });

      newSocket.on("disconnect", () => {
        console.warn("WARNING: chat app disconnected");
      });

      setSocket(() => newSocket);
    }
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formName = e.target.querySelector('input').getAttribute('name')1
    // console.log(rooms);
    // console.log(chatroom);
    if (!socket) {
      alert("Chatroom not connected yet. Try again in a little bit.");
      return;
    }
    // if (formName === "message") {
      // prevent empty submissions
      if (!message || !isUsernameConfirmed) {
        return;
      }
      // submit and blank-out the field.
      socket.emit("message-submitted", { message, username });
      setMessage("");
    // }
    // if (formName === "chatroom" ) {
    //   // console.log(chatroom)
    //   socket.emit("chatroom-created", chatroom);
    //   setChatroom("");
    // }
  };

  if (!username) {
    return (
      <UsernameForm
        className={ styles.windowSetup }
        // className={styles.window}
        // completed={isUsernameConfirmed}
        value={username}
        // avatarSrc="/favicon.ico"
        onChange={(value) => setUsername(value)}
        onSubmit={() => setUsernameConfirmed(true)}
      />
    )
  } else {
  return (
    <div>
      <Head>
        <title>2chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar
          value={null || username}
          avatarSrc="/favicon.ico"
          disabled={!isUsernameConfirmed}
        />

        <div className={styles.window}>
          <div className={styles.windowChatLeft}>
            <h3>Chatroom List</h3>
            <ChatroomInputField
              onSubmit={(e) => handleSubmit(e)}
              type="text"
              name="chatroom"
              value={chatroom}
              onChange={(value) => setChatroom(value)}
              disabled={!isUsernameConfirmed}
            />
            <RoomList
              value={rooms}
            />
          </div>

          <div className={styles.windowChatRight}>
            <UsernameField
              completed={isUsernameConfirmed}
              value={username}
              avatarSrc="/favicon.ico"
              onChange={(value) => setUsername(value)}
              onSubmit={() => setUsernameConfirmed(true)}
              placeholder={"Set username..."}
            />

            <MessageHistory
              value={history}
            />

            <MessageInputField
              onSubmit={(e) => handleSubmit(e)}
              type="text"
              name="message"
              value={message}
              avatarSrc="/favicon.ico"
              onChange={(value) => setMessage(value)}
              placeholder={ "Enter your message..."
                // username ? "Enter your message..." : "Set username..."
              }
              disabled={!isUsernameConfirmed}
            />
          </div>
        </div>
      </div>
    </div>
  )};
};
