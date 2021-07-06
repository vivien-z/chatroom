import React, { useEffect, useCallback, useContext } from "react";
import { useSocket } from "./SocketProvider";
import { io } from "socket.io-client";
import useLocalStorage from '../hooks/useLocalStorage';

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', [])
  const { socket } = useSocket()


  const addUsertoUsers = useCallback(({id, username}) => {
    setUsers(prevUsers => {
      return [...prevUsers, {id, username}]
    })
  })

  function sendSocket(id, username) {
    socket.emit(
      "user-submitted",
      {id, username}
    )
  }

  function createUser(id, username) {
    addUsertoUsers({id, username})
  }

  useEffect(() => {
    if (socket) {
      socket.on("new-user-created", ({id, username}) => {
        addUsertoUsers({id, username})
      })
    }
  }, users)

  return (
    <UsersContext.Provider value={{ users, createUser, sendSocket }}>
      { children }
    </UsersContext.Provider>
  )
}
