import React, { useState, useContext, useEffect } from "react";
import { useUsers } from "./UsersProvider";
import { io } from "socket.io-client";
import useLocalStorage from '../hooks/useLocalStorage';

const ChatroomsContext = React.createContext()
let counter = 1
let chatnumber = 1

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ username, children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  const { users } = useUsers()
  // const [chatroomMessages, setChatroomMessages] = useState([])


  function createChatroom(roomname, roomUserIds) {
    setChatrooms(prevChatrooms => {
      return [
        ...prevChatrooms,
        {roomname, roomUserIds, chatroomMessages: []}
      ]
    })
  }

  function addMessageToChatroom({ selectedChatroom, messageContent, senderUsername }) {
    // chatnumber += 1
    // console.log(messageContent)
    // chatrooms.map(c=> {
    //   console.log(`chat${chatnumber}before: ${c.roomname}`)
    //   console.log(`chat${chatnumber}before: ${c.messageContent}`)
    // })

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
    })

    // chatrooms.map(c=> {
    //   console.log(`chat${chatnumber}after: ${c.roomname}`)
    //   console.log(`chat${chatnumber}after: ${c.messageContent}`)
    // })
    // setChatroomMessages('')

  }

  function sendMessage(selectedChatroom, messageContent) {
    // if (!(selectedChatroom || messageContent)) {
    //   return null
    // } else {
    // }
    console.log(`${chatnumber}: ${selectedChatroom.roomname}, ${messageContent}`)
    addMessageToChatroom({
      selectedChatroom,
      messageContent,
      senderUsername:username
    })
  }

  console.log(`${counter}: ${chatrooms}`)
  const formattedChatrooms = chatrooms.map((chatroom, i) => {
    console.log(`${counter}: ${chatroom.chatroomMessages}`)
    counter += 1
    // chatroom.chatroomMessages = chatroomMessages

    //get current chatroom's users
    const roomUsers = chatroom.roomUserIds.map(roomUserId => {
      // console.log(`roomuser-id ${roomUserId}`)
      // const users = [{id: "1", username: "abc"}, {id: "2", username: "ljk"}]
      const user = users.find(user => {
        return user.id === roomUserId ? user : null
      })
      const name = (user && user.username) || roomUserId
        // console.log(`user-name ${name}`)
      return { id: roomUserId, username: name }
    })


    //get current chatroom's messages
    const formattedMessages = chatroom.chatroomMessages.map(m => {
      // console.log(`chatroom-name ${chatroom.roomname}`)
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
