import { useEffect, useState } from "react";
import ChatWindowSidebar from "../components/ChatWindowSidebar";
import ChatWindowMessageSide from "../components/ChatWindowMessageSide";
import { useChatrooms, selectedChatroom } from "../context/ChatroomsProvider";

const ChatWindow = ({ myUsername, myId }) => {
  const { selectedChatroom } = useChatrooms()

  return (
    <div className='d-flex h-100 p-0' >
      <ChatWindowSidebar myUsername={myUsername} myId={myId}/>
      <ChatWindowMessageSide myUsername={myUsername} myId={myId} selectedChatroom={selectedChatroom}/>
    </div>
  )
}

export default ChatWindow;
