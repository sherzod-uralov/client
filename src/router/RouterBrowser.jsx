import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import Verify from '../components/Verify'
import HomePage from '../components/HomePage'
import { useState, useEffect } from 'react'
import { useUserContext } from '../context/Context'

function RouterBrowser() {
  const { token } = useUserContext()

  const tok = (token || localStorage.getItem('token'))
  console.log(tok !== undefined);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/"
          element={tok !== undefined ? <Navigate to="/register"/>:  <HomePage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterBrowser
