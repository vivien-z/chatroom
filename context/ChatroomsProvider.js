import React, { useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])

  function createChatroom(roomUsers) {
    setChatrooms(prevChatrooms => {
      return [...prevChatrooms, {roomUsers, messages: []}]
    })
  }

  return (
    <ChatroomsContext.Provider value={{ chatrooms, createChatroom }}>
      { children }
    </ChatroomsContext.Provider>
  )
}
