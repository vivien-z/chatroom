import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

import ChatWindowSidebar from "../components/ChatWindowSidebar";
import MessageHistory from "../components/MessageHistory";
import MessageInputField from "../components/MessageInputField";
// import Chatrooms from "../components/Chatrooms";
// import ChatroomInputField from "../components/ChatroomInputField";
// import UsernameField from "../components/UsernameField";
// import UsernameForm from "../components/UsernameForm";
// import useLocalStorage from '../hooks/useLocalStorage';
import styles from '../styles/Home.module.css';


const ChatWindowMessage = ({ username }) => {

  return (
    <div className="d-flex flex-column flex-grow-1">
      <MessageHistory
        className="flex-grow-1 overflow-auto"/>
      <MessageInputField />
    </div>
  )
}

export default ChatWindowMessage;
