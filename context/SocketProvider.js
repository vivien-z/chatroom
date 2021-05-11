import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}


export function SocketProvider( username, children ) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    if (!socket) {
      const newSocket = io()

        setSocket(newSocket)
    }

    return () => newSocket.close()
  }, [username])

  return (
    <SocketContext.Provider value={socket}>

    </SocketContext.Provider>
  )
}
