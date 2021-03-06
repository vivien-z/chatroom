import { useEffect, useState } from "react";
import ChatWindowSidebar from "../components/ChatWindowSidebar";
import MessageHistory from "../components/MessageHistory";
import MessageInputField from "../components/MessageInputField";

const ChatWindowMessageSide = ({ myUsername, myId, selectedChatroom }) => {

  return (
    <div className="d-flex flex-column flex-grow-1 m-1 p-2 rounded border bg-secondary">
      <MessageHistory className="flex-grow-1 overflow-auto" myUsername={myUsername} myId={myId}/>
      <MessageInputField
        className=""
        myUsername={myUsername}
        myId={myId}
      />
    </div>
  )
}

export default ChatWindowMessageSide;
