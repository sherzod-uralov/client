import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Verify from '../components/Verify';
import HomePage from '../components/HomePage';
import WelcomePage from '../components/WelcomePage';
import PrivateRoute from '../utils/PrivateRoute'

function RouterBrowser() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path='/' element={<WelcomePage />} />
        <Route element = {<PrivateRoute/>}>
          <Route path='/homepage' element = {<HomePage/>}/>
          <Route path='/homepage' element = {<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterBrowser;
