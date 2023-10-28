import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import Verify from '../components/Verify'
import HomePage from '../components/HomePage'
import WelcomePage from '../components/WelcomePage'
import PrivateRoute from '../utils/PrivateRoute'

function RouterBrowser() {
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/"
          element={token ? <Navigate to="/homepage" /> : <WelcomePage />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/homepage" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouterBrowser
