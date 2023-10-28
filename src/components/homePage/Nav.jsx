import React, { useEffect, useState } from 'react'
import { GrApps } from 'react-icons/gr'
import {BsQuestionLg} from 'react-icons/bs'
import axios from 'axios'
import { LINK } from '../../api/PORT'

const Nav = () => {
    const [information,setInformation] = useState('');
    console.log(information);
    const fetchedData = async () => {
        try {
            const response = await axios.get(`${LINK}/profile`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            });
            setInformation(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchedData();
    },[])

  return (
    <div className="bg-[#2564cf]">
      <div className="container">
        <div className='flex justify-between'>
          <div className="flex text-white items-center gap-3">
          <GrApps/>
          <h3>To Do</h3>
          </div>
          <input type="text" />
          <div className='flex items-center gap-1'>
            <BsQuestionLg/>
            <div className='rounded-full w-6 h-6  flex items-center justify-center border-solid border-white border-[1px]'>
                {!(information?.information?.profile_image) ? <span className='text-white text-[10px]'>{information?.information?.username?.slice(0,3)}</span> : <img src={`http://localhost:5700${information?.information?.profile_image}`}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
