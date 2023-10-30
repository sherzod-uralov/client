import React, { useEffect, useState } from 'react'
import { GrApps } from 'react-icons/gr'
import { BsQuestionLg } from 'react-icons/bs'
import axios from 'axios'
import { LINK } from '../../api/PORT'
import { RiSettings5Line } from 'react-icons/ri'

const Nav = () => {
  const [information, setInformation] = useState('')
  const [darkMode, setDarkMode] = useState('light')
  const fetchedData = async () => {
    try {
      const response = await axios.get(`${LINK}/profile`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      setInformation(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSwitchMode = () => {
    setDarkMode(darkMode == 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    if (darkMode == 'dark') {
      document.documentElement.classList.add('dark')
      document.body.style.background = '#11100e'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.background = 'white'
    }
  }, [darkMode])

  useEffect(() => {
    fetchedData()
  }, [])

  return (
    <div className="bg-[#2564cf] dark:bg-[#1b1a18] py-[6px] homeNav">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex text-white items-center gap-6">
            <GrApps />
            <h3 className="font-medium">To Do</h3>
          </div>
          <input
            type="text"
            className="dark:bg-[#252422] w-96 h-8 rounded-[3px] outline-none pl-2"
          />
          <div className="flex items-center gap-1">
            <button onClick={handleSwitchMode}>dark</button>
            <RiSettings5Line className="text-white text-[24px]" />
            <BsQuestionLg className="text-white text-[24px]" />
            <div className="rounded-full w-9 h-9  flex items-center justify-center border-solid border-white border-[1px]">
              {!information?.information?.profile_image ? (
                <span className="text-white text-[10px]">
                  {information?.information?.username?.slice(0, 3)}
                </span>
              ) : (
                <img
                  className="w-9 h-9 rounded-full"
                  src={`http://localhost:5700${information?.information?.profile_image}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
