import React, { useState, useContext, useEffect, useCallback } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import { useUsers } from "./UsersProvider";
import { useSocket } from "./SocketProvider";
import { io } from "socket.io-client";

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ myUsername, children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  const { users, currentUser } = useUsers()
  const { socket } = useSocket()

  // const [chatroomMessages, setChatroomMessages] = useState([])

  // socket.on("connect", () => {
  //   console.log("Chatroom provider socket");
  // });

  function createChatroom(roomname, roomUsers) {
    // socket.emit(
    //   "create-chatroom",
    //   {roomname, roomUserIds}
    // )
    setChatrooms(prevChatrooms => {
      return [
        ...prevChatrooms,
        {roomname, roomUsers: roomUsers, chatroomMessages: []}
      ]
    })
  }

  function addUserToChatroom(newUserId, selectedChatroom) {
    // console.log("chatroom add user format")
    // console.log(selectedChatroom)
    setChatrooms(prevChatrooms => {
      const updatedChatrooms = chatrooms.map(chatroom => {
        const newUser = users.find(user => user.id === newUserId)
        const selectedChatroomUsers = selectedChatroom.roomUsers
        // const chatroomUserIds = chatroom.roomUsers.map(user => user.id)
        // const selectedChatroomUserIds = selectedChatroom.roomUsers.map(user => user.id)
        if (chatroom.roomname === selectedChatroom.roomname) {
          return {
            ...chatroom,
            roomUsers: [...selectedChatroomUsers, newUser],
            // roomUsers: [...selectedChatroomUserIds, newUserId],
          }
        } else {
          return chatroom
        }
      })
      return updatedChatrooms
    })
  }

  const addMessageToChatroom = useCallback(({ selectedChatroom, messageContent, sender }) => {
    console.log(sender)
    setChatrooms(prevChatrooms => {
      const senderName = sender.username
      const newMessage = { senderName, messageContent }
      const newUser = !selectedChatroom.roomUsers.find(user => user.username === senderName)

      const updatedChatrooms = prevChatrooms.map(chatroom => {
        // const chatroomUsers = chatroom.roomUsers
        const selectedChatroomUsers = selectedChatroom.roomUsers
        // const selectedChatroomUserIds = selectedChatroom.roomUsers.map(user => user.id)

        if (chatroom.roomname === selectedChatroom.roomname) {
          if (newUser) {
            return {
              ...chatroom,
              roomUsers: [...selectedChatroomUsers, sender],
              messages: [...chatroom.chatroomMessages, newMessage]
            }
          }
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

  function sendMessage(selectedChatroom, messageContent, sender) {
    console.log("sendMessage sender")
    console.log(selectedChatroom)
    console.log(messageContent)
    console.log(sender)
    // socket.emit("message-submitted", {selectedChatroom, messageContent, sender})
    socket.emit(
      "message-submitted",
      { selectedChatroom, messageContent, sender }
    )
    addMessageToChatroom({selectedChatroom, messageContent, sender})
    // socket.emit(
    //   "message-submitted",
    //   {selectedChatroom, messageContent, senderUsername:myUsername}
    // )
    // addMessageToChatroom({
    //   selectedChatroom,
    //   messageContent,
    //   senderUsername:myUsername
    // })
  }

  useEffect(() => {
    if (socket) {
      socket.on(
        "new-message-created", ({selectedChatroom, messageContent, sender}) => {
          console.log("socket received new msg")
          console.log(sender)
          addMessageToChatroom({selectedChatroom, messageContent, sender})
      })
      return () => {
        socket.off("new-message-created")
      }
        // addMessageToChatroom
        // ({selectedChatroom, messageContent, senderUsername}) => {
        //   addMessageToChatroom({selectedChatroom, messageContent, senderUsername})
        // }

    }
     // return () => socket.off("new-message-created")
  }, [socket, addMessageToChatroom])



  const formattedChatrooms = chatrooms.map((chatroom, i) => {
    // console.log("formated chatroom")
    // console.log(chatroom)
    // const roomUsers = chatroom.roomUsers.map(roomUser => {
    //   // const user = users.find(user => {
    //   //   if (user.id === roomUser.id) {
    //   //     return user
    //   //   }
    //   //   // return user.id === roomUserId ? user : null
    //   // })
    //   const name = (roomUser && roomUser.username) || roomUser.id
    //   return { id: roomUser.id, username: name }
    // })

    const formattedMessages = chatroom.chatroomMessages.map(m => {
      const sender = users.find(user => {
        return user.username === m.senderName
      })
      const name = (sender && sender.username) || m.sender.id
      const fromMe = myUsername === sender.username
      // console.log(fromMe)
      return { ...m, senderName: name, fromMe }
    })

    const selected = i === selectedChatroomIndex

    // return { ...chatroom, roomUsers, selected }
    return { ...chatroom, roomUsers: chatroom.roomUsers, chatroomMessages: formattedMessages, selected }
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
      {console.log(formattedChatrooms[selectedChatroomIndex])}
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
