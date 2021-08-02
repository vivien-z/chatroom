import React, { useEffect, useCallback, useContext } from "react";
import { useSocket } from "./SocketProvider";
import { io } from "socket.io-client";
import useLocalStorage from '../hooks/useLocalStorage';

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ myUsername, myId, children }) {
  const [users, setUsers] = useLocalStorage('users', [])
  const { socket } = useSocket()

  const currentUser = {id: myId, username: myUsername}

  const addUsertoUsers = useCallback(({id, username}) => {
    setUsers(prevUsers => {
      return [...prevUsers, {id, username}]
    })
  })

  function createUser(id, username) {
    socket.emit(
      "user-submitted",
      {id, username}
    )
    addUsertoUsers({id, username})
  }

  useEffect(() => {
    if (socket) {
      socket.on("new-user-created", ({id, username}) => {
        addUsertoUsers({id, username})
      })
      return () => {
        socket.off("new-user-created")
      }
    }
  }, [users])

  return (
    <UsersContext.Provider value={{ users, createUser, currentUser }}>
      { children }
    </UsersContext.Provider>
  )
}
