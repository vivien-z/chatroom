import React, { useState, useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import { useUsers } from "./UsersProvider";

const ChatroomsContext = React.createContext()


export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  // const { users } = useUsers()

  function createChatroom(roomname, roomUserIds) {
    setChatrooms(prevChatrooms => {
      return [...prevChatrooms, {roomname, roomUserIds, messages: []}]
    })
  }

  const formattedChatrooms = chatrooms.map((chatroom, i) => {
    const roomUsers = chatroom.roomUserIds.map(roomUserId => {
      const users = [{id: "1", username: "abc"}, {id: "2", username: "ljk"}]
      const user = users.find(user => {
        return user.id === roomUserId
      })
      return { id: roomUserId, name: user.username }
    })
    const selected = i === selectedChatroomIndex
    return { ...chatroom, roomUsers, selected }
  })


  const value = {
    chatrooms: formattedChatrooms,
    selectChatroomIndex: setSelectedChatroomIndex,
    createChatroom
  }
  return (
    <ChatroomsContext.Provider value={value}>
      { children }
    </ChatroomsContext.Provider>
  )
}
