import { useEffect, useState } from 'react'

const PREFIX = 'chatroom-app-'

function useLocalStorage(key, initialValue) {
const prefixedKey = PREFIX + key
const ISSERVER = typeof window === "undefined";
// get value from local storage and put into the state.
const [value, setValue] = useState(() => {
  if(!ISSERVER) {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
  }
  if (typeof initialValue === 'function') {
    return initialValue()
  } else {
    return initialValue
  }


})

// get value and save to the local storage
useEffect(() => {
  localStorage.setItem(prefixedKey, JSON.stringify(value))
}, [prefixedKey, value])

return [value, setValue]
}

export default useLocalStorage;
