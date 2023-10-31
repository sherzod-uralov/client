import React, { useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'
import { GoLightBulb } from 'react-icons/go'
import { CgRadioCheck } from 'react-icons/cg'
import {MdOutlineDateRange} from 'react-icons/md'
const HomePage = () => {
  const currentDate = new Date()
  const [hidden,setHidden] = useState(localStorage.getItem('setHidden'));
  const formattedDate = `${currentDate.toLocaleString('en-US', {
    weekday: 'long',
  })}, ${currentDate.toLocaleString('en-US', {
    month: 'long',
  })} ${currentDate.getDate()}`

  return (
    <div className="pt-6 ml-[292px] px-6 day w-full  dark:bg-[#11100e]">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <BsSun className="text-[20px] dark:text-white" />
            <h3 className="font-extrabold text-[22px] dark:text-white">
              My day
            </h3>
            <AiOutlineEllipsis className="text-[20px] dark:text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <BiSortAlt2 className="text-2xl text-[#605e5c] " />
            <h3 className="font-light text-xs text-[#605e5c]">Sort</h3>
          </div>
          <div className="flex items-center gap-1">
            <GoLightBulb className="text-2xl text-[#605e5c] " />
            <h3 className="font-light text-xs text-[#605e5c]">Suggestion</h3>
          </div>
        </div>
      </div>
      <span className="font-extrabold text-[10px] opacity-[0.5] dark:text-white">
        {formattedDate}
      </span>
      <div className="mt-8 relative flex items-center ">
        <CgRadioCheck className="left-2 absolute text-blue-500 text-xl " />
        <input
          type="text"
          
          onClick={() => {
            setHidden(true)
            localStorage.setItem('setHidden',!hidden);
          }}
          placeholder="Add a task"
          className="placeholder:text-[#2765cf] placeholder:text-[13px] pl-10 w-full dark:bg-[#252422] bg-white min-h-[52px] rounded-sm shadow-gray-200 dark:shadow-black shadow-lg outline-none text-lg"
        />
      </div>
        <div className={`flex justify-between px-4 items-center w-full h-12 dark:bg-[#252422] bg-[#faf9f7] relative z-[-30] dark:shadow-none ${hidden ? 'top-[3px] z-20' : 'top-[-45px]'} transition-all rounded-sm shadow-gray-200 shadow-lg`}>
          <MdOutlineDateRange className='dark:text-white'/>
          <button className='cursor-not-allowed px-[5px] py-[3px] border-solid dark:text-white dark:border-gray-50 border-gray-500 opacity-[0.3] border-[1.5px]'>add</button>
        </div>
    </div>
  )
}

export default HomePage
