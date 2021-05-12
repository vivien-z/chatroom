import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
// import useLocalStorage from '../hooks/useLocalStorage';

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider( username, children ) {
  const [socket, setSocket] = useState(null)
  // const [users, setUsers] = useLocalStorage('users', [])
  // const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])

  // const [message, setMessage] = useState("");
  // const [history, setHistory] = useState([]);
  // const [chatroom, setChatroom] = useState("");
  // const [chatrooms, setChatrooms] = useState([]);

  let counter = 1
  const connectSocket = () => {
    fetch("/api/chat");

    if (!socket) {
      const newSocket = io();

      newSocket.on("connect", () => {
        console.log("Chat app connected");
        counter += 1
        console.log(counter)
      });

      // newSocket.on("new-message-created", ({ selectedChatroom, messageContent, senderUsername }) => {
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
      // });

      // newSocket.on("new-chatroom-created", ({roomname, roomUserIds}) => {
      //   console.log(roomname);
      //   setChatrooms(prevChatrooms => {
      //     return [
      //       ...prevChatrooms,
      //       {roomname, roomUserIds, chatroomMessages: []}
      //     ]
      //   })
      // });

      // newSocket.on("message-new", (msg) => {
      //   setHistory((history) => [...history, msg]);
      // });

      // newSocket.on("chatroom", (chatrm) => {
      //   console.log(chatrm);
      //   setChatrooms((chatrooms) => [...chatrooms, chatrm]);
      // });

      newSocket.on("disconnect", () => {
        console.warn("WARNING: chat app disconnected");
      });

      setSocket(() => newSocket);
    }
    // return () => newSocket.close()
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const value = {
    socket
  }

  return (
    <SocketContext.Provider value={value}>

    </SocketContext.Provider>
  )
}
