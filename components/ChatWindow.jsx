import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import UsernameField from "../components/UsernameField";
import MessageHistory from "../components/MessageHistory";
import MessageInputField from "../components/MessageInputField";
import styles from '../styles/Home.module.css';

const ChatWindow = ({ type, name, value, avatarSrc, onChange, onSubmit, placeholder, disabled }) => {
  const [socket, setSocket] = useState(null);
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);

  const connectSocket = () => {
    // prime the server first. yes, this is an extra call and is inefficient.
    // but we're using NextJS for convenience, so this is a necessary evil.
    fetch("/api/chat");
    // after making sure that socket server is primed, connect to it.

    if (!socket) {
      const newSocket = io();

      newSocket.on("connect", () => {
        console.log("Chat app connected");
      });

      newSocket.on("message", (msg) => {
        setHistory((history) => [...history, msg]);
      });

      newSocket.on("chatroom", (room) => {
        setChatrooms((chatrooms) => [...chatrooms, room]);
      });

      // Logs when server disconnects
      newSocket.on("disconnect", () => {
        console.warn("WARNING: chat app disconnected");
      });

      setSocket(() => newSocket);
    }
  };

  // The websocket code
  useEffect(() => {
    connectSocket();
  }, []);

  // this method submits the form and sends the message to the server.
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!socket) {
      alert("Chatroom not connected yet. Try again in a little bit.");
      return;
    }

    // prevent empty submissions
    if (!message || !isUsernameConfirmed) {
      return;
    }

    // submit and blank-out the field.
    socket.emit("message-submitted", { message, username });
    setMessage("");
  };

  if (!isUsernameConfirmed) {
    return (
      <div className={ styles.windowSetup }>
        <UsernameField
          // className={styles.window}
          completed={isUsernameConfirmed}
          value={username}
          avatarSrc="/favicon.ico"
          onChange={(value) => setUsername(value)}
          onSubmit={() => setUsernameConfirmed(true)}
          placeholder={"Set username..."}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.window}>
        <div className={styles.windowChatLeft}>
          list of chat rooms available
          {chatrooms.map(( { chatroom }, i) => (
            <div key={i}>
              {chatroom}
            </div>
          ))}
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
    );
  }
};

export default ChatWindow;