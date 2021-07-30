import { useEffect, useState } from "react";

import ChatWindowSidebar from "../components/ChatWindowSidebar";
import MessageInfo from "../components/MessageInfo";
import MessageHistory from "../components/MessageHistory";
import MessageInputField from "../components/MessageInputField";
import styles from '../styles/ChatWindowMessageSide.module.scss';

const ChatWindowMessageSide = ({ username, id, selectedChatroom }) => {

  const messageWindow = (
    <div className="d-flex flex-column flex-grow-1 m-1 p-2 rounded border bg-secondary">
{/*      <MessageInfo
        username={username}
      />*/}
      <MessageHistory className="flex-grow-1 overflow-auto" />
      <MessageInputField
        className=""
        username={username}
        id={id}
        selectedChatroom={selectedChatroom}/>
    </div>
  )

  return (
    <>
      {selectedChatroom ? messageWindow : null}
    </>
  )
}

export default ChatWindowMessageSide;
