import React, { useState, useContext, useEffect, useCallback } from "react";

import { useUsers } from "./UsersProvider";
import { useSocket } from "./SocketProvider";
import { io } from "socket.io-client";

import useLocalStorage from '../hooks/useLocalStorage';

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ username, children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  const { users } = useUsers()
  const socket = useSocket()
  // const [chatroomMessages, setChatroomMessages] = useState([])

  function createChatroom(roomname, roomUserIds) {
    setChatrooms(prevChatrooms => {
      return [
        ...prevChatrooms,
        {roomname, roomUserIds, chatroomMessages: []}
      ]
    })
  }

  const addMessageToChatroom = useCallback(({ selectedChatroom, messageContent, senderUsername }) => {

    setChatrooms(prevChatrooms => {
      const newMessage = { senderUsername, messageContent }

      const updatedChatrooms = prevChatrooms.map(chatroom => {
        if (chatroom.roomname === selectedChatroom.roomname) {
          return {
            ...chatroom,
            chatroomMessages: [...chatroom.chatroomMessages, newMessage]
          }
        } else {
          return chatroom
        }
      })
      return updatedChatrooms
    })
  }, [setChatrooms])

  useEffect(() => {
    if (!socket) {
     socket.on("message-new", addMessageToChatroom)
     // return () => socket.off("message-new")
    }
  }, [socket, addMessageToChatroom])


  function sendMessage(selectedChatroom, messageContent) {
    socket.emit(
      "message-submitted",
      {selectedChatroom, messageContent, senderUsername:username}
    )

    addMessageToChatroom({
      selectedChatroom,
      messageContent,
      senderUsername:username
    })
  }


  const formattedChatrooms = chatrooms.map((chatroom, i) => {

    //get current chatroom's users
    const roomUsers = chatroom.roomUserIds.map(roomUserId => {
      const user = users.find(user => {
        return user.id === roomUserId ? user : null
      })
      const name = (user && user.username) || roomUserId
      return { id: roomUserId, username: name }
    })


    //get current chatroom's messages
    const formattedMessages = chatroom.chatroomMessages.map(m => {
      const sender = users.find(user => {
        return user.username === m.senderUsername
      })
      const name = (sender && sender.username) || m.senderUsername
      const fromMe = username === m.sender
      return { ...m, senderName: name, fromMe }
    })
    // }
    const selected = i === selectedChatroomIndex


    // return { ...chatroom, formattedMessages, selected }
    return { ...chatroom, roomUsers, formattedMessages, selected }
  })

  const value = {
    chatrooms: formattedChatrooms,
    selectedChatroom: formattedChatrooms[selectedChatroomIndex],
    selectChatroomIndex: setSelectedChatroomIndex,
    sendMessage,
    createChatroom
  }


  return (
    <ChatroomsContext.Provider value={value}>
      { children }
    </ChatroomsContext.Provider>
  )
}

  // const addMessageToChatroom = useCallback(({ selectedChatroom, messageContent, senderUsername }) => {

  //   setChatrooms(prevChatrooms => {
  //     const newMessage = { senderUsername, messageContent }

  //     const updatedChatrooms = prevChatrooms.map(chatroom => {
  //       if (chatroom.roomname === selectedChatroom.roomname) {
  //         return {
  //           ...chatroom,
  //           chatroomMessages: [...chatroom.chatroomMessages, newMessage]
  //         }
  //       } else {
  //         return chatroom
  //       }
  //     })
  //     return updatedChatrooms
  //   })
  // }, [setChatrooms])

  // useEffect(() => {
  //   if (!socket) {
  //    socket.on("message-new", addMessageToChatroom)
  //    return () => socket.off("message-new")
  //   }
  // }, [socket, addMessageToChatroom])


  // function sendMessage(selectedChatroom, messageContent) {
  //   if (!socket) {
  //     alert("Chatroom not connected yet. Try again in a little bit.");
  //     return;
  //   }

  //   socket.emit(
  //     "message-submitted",
  //     {selectedChatroom, messageContent, senderUsername:username}
  //   )

  //   // addMessageToChatroom({
  //   //   selectedChatroom,
  //   //   messageContent,
  //   //   senderUsername:username
  //   // })
  // }
