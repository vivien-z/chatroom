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
  const { users } = useUsers()

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
    console.log(`chatroom-name ${chatroom.roomname}`)
    const roomUsers = chatroom.roomUserIds.map(roomUserId => {
      console.log(`roomuser-id ${roomUserId}`)
      // const users = [{id: "1", username: "abc"}, {id: "2", username: "ljk"}]
      const user = users.find(user => {
        return user.id === roomUserId ? user : null
      })
      const name = (user && user.username) || roomUserId
        console.log(`user-name ${name}`)
      return { id: roomUserId, username: name }
    })
    console.log(`user-name ${roomUsers[0].username}, id: ${roomUsers[0].id}`)
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
