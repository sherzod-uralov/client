import React from 'react'
import { BsSun } from 'react-icons/bs'
import {AiOutlineEllipsis} from 'react-icons/ai'
const HomePage = () => {
  const currentDate = new Date()
  const formattedDate = `${currentDate.toLocaleString('en-US', {
    weekday: 'long',
  })}, ${currentDate.toLocaleString('en-US', {
    month: 'long',
  })} ${currentDate.getDate()}`

  return <div className="pl-7 ml-[292px] pt-6 day w-full dark:bg-[#11100e]">
    <div className='flex items-center gap-3'>
    <BsSun className='text-[20px] dark:text-white'/>
    <h3 className='font-extrabold text-[22px] dark:text-white'>My day</h3>
    <AiOutlineEllipsis className='text-[20px] dark:text-white'/>
    </div>
    <span className='font-extrabold text-[10px] opacity-[0.5] dark:text-white'>{formattedDate}</span>
         </div>
}

export default HomePage
