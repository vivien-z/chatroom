import React, { useContext, useEffect, useState } from 'react'
// import { io } from "socket.io-client";
import { Server } from "socket.io";
import useLocalStorage from '../hooks/useLocalStorage';

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider( {username, children} ) {
  const [socket, setSocket] = useState(null)
  // const [users, setUsers] = useLocalStorage('users', [])
  // const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])

  // const [message, setMessage] = useState("");
  // const [history, setHistory] = useState([]);
  // const [chatroom, setChatroom] = useState("");
  // const [chatrooms, setChatrooms] = useState([]);

  let counter = 0 //test-a
  const connectSocket = () => {
    fetch("/api/chat");

    if (!socket) {
      const newSocket = io();

      newSocket.on("connect", () => {
        console.log("Chat app connected");
        counter += 1 //test-a
        console.log(counter) //test-a
        console.log(socket.id) //test-a
      });

      newSocket.on("disconnect", () => {
        console.warn("WARNING: chat app disconnected");
      });
      setSocket(() => newSocket);
    } else {

      socket.on("user-submitted", ({id, username}) => {
        socket.emit("new-user-created", {id, username});
        socket.broadcast.emit("new-user-created", {id, username});
      });

      socket.on("message-submitted", ({ selectedChatroom, messageContent, senderUsername }) => {
        socket.emit("new-message-created", {selectedChatroom, messageContent, senderUsername})
        socket.broadcast.emit("new-message-created", {selectedChatroom, messageContent, senderUsername})
      })
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
      { children }
      {console.log('socket provider ck')}
    </SocketContext.Provider>
  )
}
