import React from 'react'
import { useUserContext } from '../context/Context'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { token } = useUserContext()
  const checkAuth = localStorage.getItem('token')
  console.log(checkAuth)
  return !checkAuth ? <Navigate to="/welcome" /> : <Outlet />
}

export default PrivateRoute
