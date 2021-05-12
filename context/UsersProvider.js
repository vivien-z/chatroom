import React, { useContext } from "react";
// import { useSocket } from "./SocketProvider";
import useLocalStorage from '../hooks/useLocalStorage';

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', [])
  // const { socket } = useSocket()

  console.log('user provider1')

  function createUser(id, username) {
    console.log('user provider2')
    setUsers(prevUsers => {
      return [...prevUsers, {id, username}]
    })
  }

  return (
    <UsersContext.Provider value={{ users, createUser }}>
      { children }
      { console.log('user provider2') }
    </UsersContext.Provider>
  )
}
