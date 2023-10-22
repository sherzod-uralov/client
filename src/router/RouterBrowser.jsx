import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import Verify from '../components/Verify'
function RouterBrowser() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/verify" Component={Verify} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterBrowser
