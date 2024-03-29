import React, { useState } from 'react'
import logo from '../assets/svg/Microsoft-Logo.wine.svg'
import { FcGoogle } from 'react-icons/fc'
import registerBg from '../assets/images/loginLogo.png'
import Select from 'react-select'
import us from '../assets/svg/uzb.svg'
import uz from '../assets/svg/usa.svg'
import { useUserContext } from '../context/Context'
import axios from 'axios'
import { LINK } from '../api/PORT'
import { Link, useNavigate } from 'react-router-dom'

const options = [
  { value: 'eng', label: 'English', icon: uz },
  { value: 'uz', label: 'Uzbek', icon: us },
]

const CustomOption = ({ data, innerProps }) => (
  <div {...innerProps} className="flex gap-2 p-1">
    <img className="pl-2" src={data.icon} alt="" width="30" />
    <span className="">{data.label}</span>
  </div>
)

const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { validateEmail, setToken } = useUserContext()
  const [emailErr, setEmailErr] = useState('')
  const [passErr, setPassErr] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate('')

  const loginSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailErr('wrong email format')
      return false
    }
    try {
      const response = await axios.post(`${LINK}/login`, {
        password,
        email,
      })
      if (response.status === 200) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        setTimeout(() => {
          navigate('/')
        }, 200)
      }
    } catch (error) {
      if (error.response.data.status === 400) {
        console.log(error)
        setError(error)
      }
    }
  }
  //salom
  const ceckPaswd = () => {
    if (password.length == 0) {
      return 'border-gray-200'
    }
    if (password.length < 8 || error?.response?.data?.msg == 'wrong password') {
      return 'border-red-400'
    } else {
      return 'border-green-400'
    }
  }

  return (
    <div className="flex flex-col justify-between md:flex-row h-screen">
      <div className="flex justify-between items-center md:hidden">
        <img src={logo} className="w-40 h-20" alt="register-logo" />
        <div style={{ width: '120px' }}>
          <Select
            className="pr-4"
            options={options}
            components={{ Option: CustomOption }}
            defaultInputValue={options[0].label}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-5 md:pl-20 md:pr-10 md:pt-10 pb-12 items-center">
        <div className="md:flex justify-between items-center hidden">
          <img src={logo} className="w-40 h-20" alt="register-logo" />
          <div style={{ width: '120px' }}>
            <Select
              options={options}
              components={{ Option: CustomOption }}
              defaultInputValue={options[0].label}
            />
          </div>
        </div>
        <div className="pt-10 md:pt-3">
          <h1 className="font-normal text-3xl md:text-4xl lg:text-4xl text-center">
            Welcome to
          </h1>
          <p className="font-semibold text-4xl md:text-xl pt-4 lg:text-5xl text-center text-[#2564ce]">
            Microsoft ToDo
          </p>
        </div>
        <button className="border-gray-200 border-2 border-solid  m-auto w-full max-w-[580px] py-4 rounded-lg mt-14 justify-center bg-white items-center flex  gap-3">
          <FcGoogle className="text-lg lg:text-" />
          <h2 className="text-lg lg:text-xl text-center">
            Continue With Google
          </h2>
        </button>

        <div className="flex items-center gap-4 justify-center mt-6">
          <span className="w-12 md:w-24 bg-[#2564ce] h-0.5"></span>
          <span className="text-[#2564ce] text-lg lg:text-xl">or</span>
          <span className="w-12 md:w-24 bg-[#2564ce] h-0.5"></span>
        </div>
        <div>
          <form onSubmit={loginSubmit} className="mt-5 flex flex-col gap-5">
            <input
              type="text"
              className={`${
                validateEmail(email)
                  ? error?.response?.data?.msg === 'username notfound'
                    ? 'border-red-400'
                    : 'border-green-400'
                  : email.trim().length === 0
                  ? 'border-gray-200'
                  : 'border-red-400'
              } py-[17px] text-[15px] px-4 block w-full md:max-w-[580px] m-auto border-solid border-2 rounded-md text-sm outline-none`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <input
              type="password"
              className={`${ceckPaswd()} py-[17px] text-[15px] px-4 block w-full md:max-w-[580px] m-auto border-solid border-2 rounded-md text-sm outline-none`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />

            <div className=" md:max-w-[580px] m-auto text-red-600 font-semibold">
              <span className="w-full">{error?.response?.data?.msg}</span>

              <span className="w-full">{passErr ? 'wrong password' : ''} </span>
            </div>
            <button className="border-gray-200 text-white font-bold border-2 border-solid block m-auto w-full max-w-[580px] py-[20px] rounded-full mt-4 bg-[#2564ce]">
              Login
            </button>
          </form>
          <Link to="/register">
            <div className="flex gap-3 items-center mt-3 md:max-w-[580px] m-auto">
              <h4 className="pt-[6px] pb-[6px] pl-[15px] pr-[15px] text-[#2564ce] font-normal ">
                Don't have an account?
              </h4>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 hidden md:block">
        <img
          src={registerBg}
          className="h-full w-full object-cover block"
          alt=""
        />
      </div>
    </div>
  )
}

export default Login
