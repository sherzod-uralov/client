import React from 'react'
import left from '../../assets/images/welcome-left.png'
import right from '../../assets/images/welcome-right.png'
import like from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillAndroid, AiFillWindows, AiFillApple } from 'react-icons/ai'
import center from '../../assets/images/welcome-center.png'

const Hero = () => {
  const navigatge = useNavigate()
  const click = () => {
    navigatge('/register')
  }
  return (
    <div className="container">
      <div className="flex items-end justify-evenly mt-16 mb-12">
        <img
          src={left}
          className="w-[296px] h-[458px] hidden xl:block"
          alt=""
        />
        <div>
          <img src={like} className="w-[96px] block m-auto" alt="" />
          <h1 className="sm:text-[42px] text-[30px] sm:font-normal text-center pt-7 pb-9 font-light">
            Microsoft To Do
          </h1>
          <img
            src={center}
            alt=""
            className="w-[253px] h-[190px] block m-auto xl:hidden"
          />
          <p className="text-[20px] w-[348px] text-center hidden xl:block">
            To Do gives you focus, from work to play.
          </p>
          <button
            onClick={click}
            className="px-12 py-3 border-none rounded-sm block m-auto mt-7 xl:mt-12 font-bold bg-[#0078d4] text-white "
          >
            Get started
          </button>
          <Link className="text-center block pt-3 text-[#0071c8]">
            Learn more
          </Link>
          <span className="text-center block pt-9 lg:pt-16">
            Download To Do
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
          <span className="text-center block pt-7 font-normal text-gray-600">
            Terms of use for To Do
          </span>
        </div>
        <img
          src={right}
          className="w-[214px] h-[515px] hidden xl:block"
          alt=""
        />
      </div>
    </div>
  )
}

export default Hero
