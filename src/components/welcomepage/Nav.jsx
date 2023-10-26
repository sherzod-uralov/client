import React from 'react'
import logo from '../../assets/svg/Microsoft-Logo.wine.svg'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { PiUserCirclePlusThin } from 'react-icons/pi'
const Nav = () => {
  return (
    <div className="container">
      <div className="navbar flex items-center justify-between">
        <div className="flex items-center gap-14">
          <img src={logo} className="w-40 h-20" alt="" />
          <ul className="flex gap-5">
            <li>Microsoft 365</li>
            <li>Teams</li>
            <li>Windows </li>
            <li>Surface </li>
            <li>Xbox</li>
            <li>Deals</li>
            <li>Small Business</li>
            <li>Support </li>
          </ul>
        </div>

        <div className="flex ">
          <ul className="flex gap-5">
            <li className="flex gap-2 items-center">
              Search <AiOutlineSearch />
            </li>
            <li className="flex items-center gap-2">
              Cart <FiShoppingCart />
            </li>
            <li className="flex items-center gap-2">
              Sign in <PiUserCirclePlusThin className="text-[40px]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav
