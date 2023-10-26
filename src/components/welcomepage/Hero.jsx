import React from 'react'
import left from '../../assets/images/welcome-left.png'
import right from '../../assets/images/welcome-right.png'
import like from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { AiFillAndroid, AiFillWindows, AiFillApple } from 'react-icons/ai'

const Hero = () => {
  return (
    <div className="container">
      <div className="flex items-end justify-evenly mt-16">
        <img src={left} className="w-[296px] h-[458px]" alt="" />
        <div>
          <img src={like} className="w-[96px] block m-auto" alt="" />
          <h1 className="text-[42px] text-center pt-7 pb-9 font-light">
            Microsoft To Do
          </h1>
          <p className="text-[20px] w-[348px] text-center">
            To Do{' '}
            <b className="text-[#000000] font-normal">
              поможет вам сосредоточиться на любом занятии — от работы до игры.
            </b>
          </p>
          <button className="px-12 py-3 border-none rounded-sm block m-auto mt-12 font-bold bg-[#0078d4] text-white ">
            Начало работы
          </button>
          <Link className="text-center block pt-3 text-[#0071c8]">
            Подробнее
          </Link>
          <span className="text-center block pt-16">
            <b className="text-[#605e5c]">Скачать</b> To Do
          </span>
          <div className="flex items-center justify-center gap-5 mt-4">
            <div className="px-3 py-[3px] border-solid border-[#a19f9d] border-[1px] rounded-sm">
              <AiFillAndroid className="text-[25px] text-gray-500" />
            </div>
            <div className="px-3 py-[3px] border-solid border-[#a19f9d] border-[1px] rounded-sm">
              <AiFillWindows className="text-[25px] text-gray-500" />
            </div>
            <div className="px-3 py-[3px] border-solid border-[#a19f9d] border-[1px] rounded-sm">
              <AiFillApple className="text-[25px] text-gray-500" />
            </div>
          </div>
          <span className="text-center block pt-2">
            <b className="text-[#605e5c]">Условия использования</b> To Do
          </span>
        </div>
        <img src={right} className="w-[214px] h-[515px]" alt="" />
      </div>
    </div>
  )
}

export default Hero
