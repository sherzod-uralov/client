import axios from 'axios'
import React, { useState } from 'react'
import { LINK } from '../api/PORT'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserContext } from '../context/Context'

const EmailVerification = () => {
  const { setToken, token } = useUserContext()
  const navigate = useNavigate()
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [error, setError] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    if (verificationCode.length < 6) {
      setError(`kod to'liq emas`)
    } else {
      const response = await axios.post(`${LINK}/verify`, {
        code: Number(verificationCode.join('')),
      })
      console.log(response.data.token)
      if (response.status === 201) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        navigate('/')
      }
      console.log(response)
    }
  }

  const handleInputChange = (index, e) => {
    const value = e.target.value

    if (/^\d+$/.test(value) && value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value

      if (index < 5 && value !== '') {
        document.getElementById(`code-input-${index + 1}`).focus()
      }

      setVerificationCode(newCode)
    } else if (value === '' && index > 0) {
      const newCode = [...verificationCode]
      newCode[index] = ''
      setVerificationCode(newCode)

      if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus()
      }
    } else if (value === '' && index === 0) {
      const newCode = [...verificationCode]
      newCode[index] = ''
      setVerificationCode(newCode)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.keyCode === 37 && index >= 0) {
      e.preventDefault()
      document.getElementById(`code-input-${index - 1}`).focus()
    } else if (e.keyCode === 39 && index < 5) {
      e.preventDefault()
      document.getElementById(`code-input-${index + 1}`).focus()
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Emailni Tasdiqlash
        </h2>
        <p className="mb-6 text-center">
          Foydalanuvchi emailiga kod yuborilgan 6 xonali kodni kiriting.
        </p>
        <div className="flex items-center justify-center mb-">
          <form onSubmit={onSubmit} className="">
            <div className="flex gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-10 text-2xl text-center border border-gray-300 rounded"
                />
              ))}
            </div>
            <button className="px-[1px] py-2 bg-[#2564ce] w-full mt-6 rounded-lg font-bold text-white">
              verify
            </button>
          </form>
          {error}
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
