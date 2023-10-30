import React from 'react'
import Nav from '../components/homePage/Nav'
import SideBar from '../components/homePage/SideBar'

const FullLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </>
  )
}

export default FullLayout
