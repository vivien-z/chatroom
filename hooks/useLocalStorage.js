import { useEffect, useState } from 'react'

const PREFIX = 'chatroom-app-'
 export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key
  // get value from local storage and put into the state.
  const [value, setValue] = useState(() => {
    const jsonValue = localsStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  // get value and save to the local storage
  useEffect(() => {
    localsStorage.setItem(prefixedKey, JSON.stringigy(value))
  }, [prefixedKey, value])

  return [value, setValue]
 }

