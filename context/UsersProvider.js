import React, { useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', [])
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
    </UsersContext.Provider>
  )
}
