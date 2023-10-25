import React, { useState } from 'react';

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    if (/^\d+$/.test(value) && value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;

      if (index < 5 && value !== '') {
        document.getElementById(`code-input-${index + 1}`).focus();
      }

      setVerificationCode(newCode);
    } else if (value === '' && index > 0) {
      const newCode = [...verificationCode];
      newCode[index] = '';
      setVerificationCode(newCode);

      if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    } else if (value === '' && index === 0) {
      const newCode = [...verificationCode];
      newCode[index] = '';
      setVerificationCode(newCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.keyCode === 37 && index >= 0) {
      e.preventDefault(); 
      document.getElementById(`code-input-${index - 1}`).focus();
    } else if (e.keyCode === 39 && index < 5) {
      e.preventDefault(); 
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Emailni Tasdiqlash</h2>
        <p className="mb-6 text-center">
          Foydalanuvchi telefon raqamingizga yuborilgan 6 xonali kodni kiriting.
        </p>
        <div className="flex items-center justify-center mb-4 space-x-2">
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
      </div>
    </div>
  );
};

export default EmailVerification;
