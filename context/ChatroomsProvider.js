import React, { useState, useContext, useEffect } from "react";
import { useUsers } from "./UsersProvider";
import { io } from "socket.io-client";
import useLocalStorage from '../hooks/useLocalStorage';

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ children }) {
  const [chatroomMessages, setChatroomMessages] = useState([])
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  // const { users } = useUsers()

  function createChatroom(roomname, roomUserIds) {
    // setChatrooms(prevChatrooms => {
    //   return [...prevChatrooms, {roomname, roomUserIds, chatroomMessages: []}]
    // })
    console.log(`${roomname} and ${roomUserIds}`)
    setChatrooms([{roomname: roomname, userId: roomUserIds }])
    // setChatrooms(prevChatrooms => {
    //   return [...prevChatrooms, {roomname: "roomname", userId: '2' }]
    // })
      console.log(chatrooms)
  }

  function addMessageToChatroom({ selectedChatroom, message, sender }) {
    const newChatroomMessage = { sender, message }

    setChatroomMessages(prevChatroomMessages => {
      return [
        ...prevChatroomMessages,
        newChatroomMessage
        // { chatroomMessages: [newChatroomMessage] } // could add message time
      ]
    })
    return selectedChatroom.chatroomMessages = chatroomMessages
  }

  function sendMessage(selectedChatroom, message) {
    // const selectedRoomUsers = selectedChatroom.roomUserIds.map(roomUserId => {
    //   const users = [{id: "1", username: "abc"}, {id: "2", username: "ljk"}]
    //   const user = users.find(user => {
    //     return user.id === roomUserId
    //   })
    //   return { id: roomUserId, name: user.username }
    // })
    if (!(selectedChatroom || message)) {
      return null
    } else {
      addMessageToChatroom({ selectedChatroom, message, sender:username })
      console.log(username)
    }
  }



  const formattedChatrooms = chatrooms.map((chatroom, i) => {
    //get current chatroom's users
    const roomUsers = chatroom.roomUserIds.map(roomUserId => {
      const users = [{id: "1", username: "abc"}, {id: "2", username: "ljk"}]
      const user = users.find(user => {
        return user.id === roomUserId
      })
      const name = (user && user.username) || roomUserId
      return { id: roomUserId, username: name }
    })
    //get current chatroom's messages

    // if (chatroom.chatroomMessages !== []) {
    //   const chatroomMessagesSet = chatroom.chatroomMessages.map(m => {
    //     const users = [{id: "1", username: "abc"}, {id: "2", username: "ljk"}]
    //     const sender = users.find(user => {
    //       return user.username === m.sender
    //     })
    //     const name = (sender && sender.username) || m.sender
    //     const fromMe = username === m.sender
    //     return { ...m, senderName: name, fromMe }
    //   })
    // }

    const selected = i === selectedChatroomIndex

    return { ...chatroom, roomUsers, selected }
    // return { ...chatroom, roomUsers, chatroomMessagesSet, selected }
  })


  const value = {
    chatrooms: formattedChatrooms,
    selectedChatroom: formattedChatrooms[selectedChatroomIndex],
    selectChatroomIndex: setSelectedChatroomIndex,
    // sendMessage,
    createChatroom
  }
  return (
    <ChatroomsContext.Provider value={value}>
      { children }
    </ChatroomsContext.Provider>
  )
}
