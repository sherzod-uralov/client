import React, { useEffect, useState } from 'react'
import { MdOutlineApps } from 'react-icons/md'
import { BsQuestionLg } from 'react-icons/bs'
import axios from 'axios'
import { LINK } from '../../api/PORT'
import { RiSettings5Line } from 'react-icons/ri'
import { useUserContext } from '../../context/Context'
import { MdOutlineClear } from 'react-icons/md'

const Nav = () => {
  const [information, setInformation] = useState('')
  const { darkMode, setDarkMode } = useUserContext()
  const [toogleMenu, setToggleMenu] = useState(false)
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

  const handleSwitchMode = (e) => {
    const newMode = darkMode === 'dark' ? 'light' : 'dark';
    setDarkMode(newMode);
    localStorage.setItem('darkmode', newMode);
  }

  useEffect(() => {
    if (darkMode == 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.style.background = '#11100e'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.background = '#faf9f7'
    }
  }, [darkMode])

  useEffect(() => {
    fetchedData()
  }, [])

  return (
    <div className="bg-[#2564cf] dark:bg-[#1b1a18] py-[6px] fixed top-0 w-full z-[100] homeNav">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex text-white items-center gap-6">
            <MdOutlineApps className = 'text-black dark:text-white text-xl'/>
            <h3 className="font-medium">To Do</h3>
          </div>
          <input
            type="text"
            className="dark:bg-[#252422] w-96 h-8 rounded-[3px] outline-none pl-2"
          />
          <div className="flex items-center gap-1">
            <RiSettings5Line
              className="text-white text-[24px]"
              onClick={() => setToggleMenu(!toogleMenu)}
            />
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
      <div
        className={`${
          toogleMenu ? 'right-0' : 'right-[-200%]'
        } poppins-bold pt-5 px-4 fixed transition-all h-full dark:bg-[#212121] bg-white z-50 top-[48.4px] w-80`}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-light text-xl dark:text-white text-gray-800 opacity-[0.7]">
            Settings
          </h2>
          <MdOutlineClear
            onClick={() => setToggleMenu(!toogleMenu)}
            className="text-xl transition-all hover:bg-slate-300 dark:text-white"
          />
        </div>
        <span className="block pt-7 font-black dark:text-white">General</span>
        <div className="pt-7 ">
          <span className="dark:text-white">Turn on night mode</span>
          <div className='flex gap-3 items-center pt-5'>
          <div className='flex items-center'>
          <input onChange={handleSwitchMode} checked = {darkMode == 'dark'} type="checkbox" id="switch" />
          <label for="switch">Toggle</label>
          </div>
          <p className='text-black dark:text-white text-lg'>{darkMode == "dark" ? 'on' : 'off'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
