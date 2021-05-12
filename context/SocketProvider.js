import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}


export function SocketProvider( username, children ) {
  const [socket, setSocket] = useState(null)

  const connectSocket = () => {
    fetch("/api/chat");

    if (!socket) {
      const newSocket = io();

      newSocket.on("connect", () => {
        console.log("Chat app connected");
      });

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
