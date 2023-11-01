import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { LINK } from '../api/PORT'
const UserContext = createContext()
export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [list, setList] = useState('')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode'))
  const [listTodo, setListTodo] = useState('')

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  const getData = async () => {
    try {
      const response = await axios.get(`${LINK}/list`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      setList(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        list,
        setList,
        token,
        setToken,
        darkMode,
        setDarkMode,
        validateEmail,
        getData,
        listTodo,
        setListTodo,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
