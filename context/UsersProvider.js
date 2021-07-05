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

  useEffect(() => {
    if (socket) {
      socket.on(
        "new-user-created",
        // addUsertoUsers({id, username})
        (() => addUsertoUsers({id, username}))
      )
    }
  }, [addUsertoUsers])

  function createUser(id, username) {
    console.log('create user')
    console.log(id)
    console.log(username)
    socket.emit(
      "user-submitted",
      {id, username}
    )
    // addUsertoUsers({id, username})

  }

  return (
    <UsersContext.Provider value={{ users, createUser }}>
      { children }
    </UsersContext.Provider>
  )
}
