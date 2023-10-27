import React, { useState } from 'react'
import logo from '../../assets/svg/Microsoft-Logo.wine.svg'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import {CiMenuBurger} from 'react-icons/ci'
import { PiUserCirclePlusThin } from 'react-icons/pi'
const Nav = () => {

    const [menu,setMenu] = useState(true);
    
    const ToogleMEnu = () => {
        if(menu){
            document.body.style.overflow = 'hidden'
        }
        else{
            document.body.style.overflow = 'auto'
        }
        setMenu(!menu);
    }

  return (
    <div className="container border-b-[1px] lg:border-none bg-white overflow-hidden">
      <div className="navbar flex items-center justify-between">
        <div className="flex items-center gap-1">
            <div className='flex items-center gap-3'>
            <CiMenuBurger onClick={ToogleMEnu}  className='cursor-pointer text-gray-500 lg:hidden block text-[22px] h-8'/>
            <li className="flex gap-2 lg:hidden items-center">
              <p className="hidden 2xl:block">Search</p>
              <AiOutlineSearch className="text-gray-500 text-[20px] rotate-90" />
            </li>
            </div>
          <img src={logo} className="w-40 h-20 hidden lg:block" alt="" />
          <ul className={`lg:flex-row lg:relative  lg:top-0 lg:bg-transparent lg:border-none flex gap-0 lg:gap-5 bg-gray-50 fixed top-[65px] lg:left-0 ${menu ? 'left-[-100%]' : 'left-0'} w-full h-full flex-col font-thin lg:font-medium text-[20px] lg:text-[13px]`}>
            <li className="cursor-pointer border-t-0 border-solid pl-2 py-3 border-b-0 border-gray-200 border-[1px] lg:border-none">
              Microsoft 365
            </li>
            <li className="border-solid cursor-pointer pl-2 py-3 border-b-0 border-gray-200 border-[1px] lg:border-none">
              Teams
            </li>
            <li className="border-solid pl-2 py-3 cursor-pointer border-b-0 border-gray-200 border-[1px] lg:border-none">
              Windows{' '}
            </li>
            <li className="border-solid pl-2 py-3 border-b-0 cursor-pointer border-gray-200 border-[1px] lg:border-none">
              Surface{' '}
            </li>
            <li className="border-solid pl-2 py-3 border-b-0 border-gray-200 cursor-pointer border-[1px] lg:border-none">
              Xbox
            </li>
            <li className="border-solid pl-2 py-3 border-gray-200 border-[1px] lg:border-none cursor-pointer">
              Deals
            </li>
          </ul>
        </div>
        <img src={logo} className="w-36 h-14 block lg:hidden" alt="" />
        <div className="flex ">
          <ul className="flex gap-5">
            <li className="hidden gap-2 lg:flex items-center">
              <p className="hidden 2xl:block">Search</p>
              <AiOutlineSearch className="text-[20px] text-gray-500" />
            </li>
            <li className="flex items-center gap-2">
              <p className="hidden 2xl:block">Cart</p>
              <FiShoppingCart className="text-[18px] text-gray-500" />
            </li>
            <li className="flex items-center gap-2">
              <p className="hidden 2xl:block">Sign in</p>
              <PiUserCirclePlusThin className="text-[40px] text-gray-500" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav
