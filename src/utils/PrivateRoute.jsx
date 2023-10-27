import React from 'react'
import { useUserContext } from '../context/Context'
import { Navigate, Outlet } from 'react-router-dom'
import WelcomePage from '../components/WelcomePage'

const PrivateRoute = () => {
  const { token } = useUserContext()
  const checkAuth = token || localStorage.getItem('token')
  return !checkAuth ? <Navigate to="/" /> : <Outlet />
}

export default PrivateRoute
