import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
// import { useUsers } from "../context/UsersProvider";

// import { Server } from "socket.io";
import useLocalStorage from '../hooks/useLocalStorage';

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider( {username, children} ) {
  const [socket, setSocket] = useState(null)
  // const { createUser } = useUsers()
  // const [users, setUsers] = useLocalStorage('users', [])
  // const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])

  // const [message, setMessage] = useState("");
  // const [history, setHistory] = useState([]);
  // const [chatroom, setChatroom] = useState("");
  // const [chatrooms, setChatrooms] = useState([]);


  const connectSocket = () => {
    fetch("/api/chat").finally(() => {
      if (!socket) {
        const newSocket = io();
        // const { createUser } = useUsers()

        newSocket.on("connect", () => {
          console.log("Chat app connected");
          console.log(newSocket.id) //test-a socket.id matches a chatroom
        });

        // newSocket.on("new-user-created", ({id, username}) => {
        //   createUser(id, username)
        //   console.log("test")
        // });

        // newSocket.on("user-submitted", ({id, username}) => {
        //   newSocket.emit("new-user-created", {id, username});
        //   newSocket.broadcast.emit("new-user-created", {id, username});
        // });

        // newSocket.on("message-submitted", ({ selectedChatroom, messageContent, senderUsername }) => {
        //   newSocket.emit("new-message-created", {selectedChatroom, messageContent, senderUsername})
        //   newSocket.broadcast.emit("new-message-created", {selectedChatroom, messageContent, senderUsername})
        // })

        newSocket.on("disconnect", () => {
          console.warn("WARNING: chat app disconnected");
        });
        setSocket(() => newSocket);
      }
      return () => newSocket.close()
    });

  };

  useEffect(() => {
    connectSocket();
  }, []);

  const value = {
    socket
  }

  return (
    <SocketContext.Provider value={value}>
      { children }
      {console.log('socket provider ck')}
    </SocketContext.Provider>
  )
}
