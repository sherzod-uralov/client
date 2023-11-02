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
  const [importantTodo, setImportantTodo] = useState('')
  const [menu, setMEnu] = useState(false)
  const [importantCount, setImportantCount] = useState(0);
  const [myDayCount, setMyDayCount] = useState(0);
  
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

  const importantData = async () => {
    try {
      const response = await axios.get(`${LINK}/todo`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      setImportantTodo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        menu,
        importantData,
        importantCount,
        setImportantCount,
        setMyDayCount,
        myDayCount,
        importantTodo,
        setImportantTodo,
        setMEnu,
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
