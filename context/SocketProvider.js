import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
import useLocalStorage from '../hooks/useLocalStorage';

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({myUsername, myId, children}) {
  const [socket, setSocket] = useState(null)

  const connectSocket = () => {
    fetch("/api/chat").finally(() => {
      if (!socket) {
        const newSocket = io();

        newSocket.on("connect", () => {
          console.log("Chat app connected");
          // console.log(newSocket.id) //test-a socket.id matches a chatroom
        });

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
    </SocketContext.Provider>
  )
}
