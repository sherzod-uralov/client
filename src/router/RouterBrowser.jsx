import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import Verify from '../components/Verify'
import HomePage from '../components/HomePage'
import WelcomePage from '../components/WelcomePage'
import PrivateRoute from '../utils/PrivateRoute'
import Nav from '../components/homePage/Nav'
import SideBar from '../components/homePage/SideBar'
import List from '../components/homePage/List'
import NotFound from '../utils/NotFound'

function RouterBrowser() {
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <>
                <Nav />
                <div className="flex">
                  <SideBar />
                  <HomePage />
                </div>
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <Nav />
                <div className="flex">
                  <SideBar />
                  <List />
                </div>
              </>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterBrowser
