import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import ChatWindowSidebar from "../components/ChatWindowSidebar";
import MessageInfo from "../components/MessageInfo";
import MessageHistory from "../components/MessageHistory";
import MessageInputField from "../components/MessageInputField";
// import Chatrooms from "../components/Chatrooms";
// import ChatroomInputField from "../components/ChatroomInputField";
// import UsernameField from "../components/UsernameField";
// import UsernameForm from "../components/UsernameForm";
// import useLocalStorage from '../hooks/useLocalStorage';
import styles from '../styles/Home.module.css';

const ChatWindowMessageSide = ({ username, selectedChatroom }) => {
  const [socket, setSocket] = useState(null);
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);

  // const [username, setUsername] = useState("");
  // const [username, setUsername] = useLocalStorage('username');
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  // const [roomname, setRoomname] = useLocalStorage('roomname');
  const [chatroom, setChatroom] = useState("");
  const [chatrooms, setChatrooms] = useState([]);

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
        setChatrooms((chatrooms) => [...chatrooms, chatrm]);
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
    // console.log(Chatrooms);
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

  if (!selectedChatroom) {
    return
  } else {
    return (
      <div className="d-flex flex-column flex-grow-1">
        <MessageInfo
          username={username}
        />
       <MessageHistory
          className="flex-grow-1 overflow-auto"
        />
        <MessageInputField
          className=""
          selectedChatroom={selectedChatroom}/>
      </div>
    )
  }
}

export default ChatWindowMessageSide;
