import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LINK } from '../../api/PORT';
import { useNavigate } from 'react-router-dom';

const Userprofile = () => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const fetchedData = async () => {
    try {
      const response = await axios.get(`${LINK}/profile`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('profile_image', profileImage);

      const response = await axios.put(`${LINK}/profile`, {formData}, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      navigate('/')

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchedData();
  },[])

  return ( 
    <div className='flex items-center justify-center h-screen px-5 '>
      <div className='h-[500px] w-[800px] bg-[#2765cf] rounded-lg p-6 relative'>
        <h1 className='text-center text-2xl text-white pb-4 pt-3'>Profile</h1>
        <form onSubmit={handleFormSubmit} className="text-center">
          <input
            type="text"
            className="py-2 px-4 mb-4 block w-full md:max-w-[380px] mx-auto border-gray-200 border-solid border-2 rounded-md text-[15px] outline-none"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="file"
            accept='.png,.jpeg,.jpg,.svg'
            className="py-2 px-4 mb-4 block w-full md:max-w-[380px] mx-auto border-gray-200 border-solid border-2 rounded-md text-[15px] outline-none"
            placeholder="File"
            onChange={handleFileChange}
          />
          <button 
            type="submit"
            className="bg-red-500 mx-auto block text-white py-2 px-4 mt-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Update Profile
          </button>
        </form>
        <button onClick={() => {
            localStorage.clear()
            window.location.reload();
        }} className='absolute bottom-0 left-0 px-5 py-2 rounded-sm bg-green-400'>sign out</button>
      </div>
    </div>
  );
}

export default Userprofile;
