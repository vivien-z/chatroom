import { useEffect, useState } from "react";


import ChatWindowSidebar from "../components/ChatWindowSidebar";
import MessageInfo from "../components/MessageInfo";
import MessageHistory from "../components/MessageHistory";
import MessageInputField from "../components/MessageInputField";


const ChatWindowMessageSide = ({ username, selectedChatroom }) => {

  if (!selectedChatroom) {
    return null
  } else {
    return (
      <div className="d-flex flex-column flex-grow-1">
        message side
        <MessageInfo
          username={username}
        />
        <MessageHistory
          className="flex-grow-1 overflow-auto"
        />
        <MessageInputField
          className=""
          username={username}
          selectedChatroom={selectedChatroom}/>
      </div>
    )
  }
}

export default ChatWindowMessageSide;
