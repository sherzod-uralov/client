import React, { useEffect, useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'
import { GrPlan } from 'react-icons/gr'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BiHomeAlt2 } from 'react-icons/bi'
import axios from 'axios'
import { LINK } from '../../api/PORT'
import { BsPlusLg } from 'react-icons/bs'
import {AiFillDelete} from 'react-icons/ai'
import {BiPrinter} from 'react-icons/bi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import {MdOutlineDriveFileRenameOutline} from 'react-icons/md'

const SideBar = () => {
  const [list, setList] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [id,setId] = useState('');
  const clikedMenu = (event,id) => {
    console.log(id);
    setId(id)
    event.preventDefault()
    setContextMenuVisible(true)
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
  }

  document.addEventListener('click' ,() => {
    setContextMenuVisible(false);
  })

  const deleteList = async (id) => {
    try {
      
      await axios.delete(`${LINK}/list/${id}`,{
        headers:{
          Authorization:localStorage.getItem('token')
        }
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  const addList = async () => {
    try {
      const response = await axios.post(
        `${LINK}/list`,
        {
          list_name: inputValue,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      getData()
      setInputValue('')
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(`${LINK}/list`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      setList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="sidebar font-poppins font-normal">
        <div className='flex flex-col justify-between'>
        <div className="bg-[#ffffff] dark:bg-[#252422] h-screen fixed left-0 shadow-gray-300 shadow-md pt-[40px]">
          <RxHamburgerMenu  className="ml-5 mb-5 dark:text-white" />
          <div className="flex items-center py-3 px-5  w-[290px] bg-transparent dark:hover:bg-[#323130] hover:bg-gray-100 transition-all">
            <div className="flex gap-4 items-center">
              <BsSun className='dark:text-white'/>
              <button className='dark:text-white'>My day</button>
            </div>
            <span></span>
          </div>
          <div className="flex items-center justify-between py-3 px-5  w-[290px] dark:hover:bg-[#323130] bg-transparent  hover:bg-gray-100 transition-all">
            <div className="flex gap-4 items-center">
              <AiOutlineStar className='dark:text-white'/>
              <button className='dark:text-white'>Important</button>
            </div>
            <span></span>
          </div>
          <div className="flex items-center py-3 px-5  w-[290px] bg-transparent dark:hover:bg-[#323130]  hover:bg-gray-100 transition-all">
            <div className="flex gap-4 items-center">
              <GrPlan className='dark:bg-white'/>
              <button className='dark:text-white'>planned</button>
            </div>
            <span></span>
          </div>
          <div className="flex items-center py-3 px-5  w-[290px] bg-transparent dark:hover:bg-[#323130] hover:bg-gray-100 transition-all">
            <div className="flex gap-4 items-center dark:text-white">
              <BiHomeAlt2 className='dark:text-white'/>
              <button>Tasks</button>
            </div>
            <span></span>
          </div>
          <span className="block bg-[#e0dfdd]  w-[265px] opacity-[0.7] m-auto mt-3 h-[1px]"></span>
          <div className="pl-[2px] mt-5 flex flex-col gap-0 overflow-x-auto h-96">
            {list?.data?.map((e, i) => (
              <div
                onContextMenu={(event) => clikedMenu(event,e.list_id)}
                className="flex cursor-pointer items-center py-3 gap-3 dark:hover:bg-[#323130] hover:bg-gray-100 transition-all w-[290px] justify-between px-4"
                key={i}
              >
                <div className="flex items-center gap-4 dark:text-white">
                  <AiOutlineUnorderedList className='dark:text-white'/>
                  {e.list_name}
                </div>
                <span className="text-[12px] font-bold">
                  {e?.List_todos?.length === 0 ? '' : e?.List_todos?.length}
                </span>
              </div>
            ))}
            
          </div>
          <div className="fixed bottom-2 z-30 bg-white dark:bg-[#252422]">
          <span className="block bg-[#e0dfdd]  opacity-[0.7] w-[292px]  h-[1px]"></span>
              <div className='flex items-center w-full pl-4 py-3 gap-4'>
              <BsPlusLg className="cursor-pointer dark:text-white" onClick={addList} />
              <input
                required
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                placeholder="new list"
                className="outline-none w-[220px] dark:bg-[#252422]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {

                    addList();
                  }
                }}
              />
            </div>
              </div>
        </div>
        </div>
      </div>
      {contextMenuVisible && (
        <div
          className="context-menu absolute transition-colors"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <div className="flex bg-white dark:bg-[#252422] dark:shadow-custom-dark shadow-custom flex-col w-36 rounded-[4px] h-32 transition-colors">
          <div className='cursor-pointer flex items-center dark:hover:bg-[#323130] hover:bg-slate-100 transition-all gap-2 pl-2'>
          <MdOutlineDriveFileRenameOutline className='dark:text-white text-[23px]'/>
          <span className="py-2 dark:text-white">Reneme</span>
          </div>
          <div className='cursor-pointer flex items-center dark:hover:bg-[#323130] hover:bg-slate-100 transition-all gap-2 pl-2'>
          <BiPrinter className='text-[23px] dark:text-white'/>
          <span className="py-2 dark:text-white">Print</span>
          </div>
          <span className='block h-[2px] w-full bg-black opacity-[0.2]'></span>
          <div onClick={() => deleteList(id)} className='cursor-pointer flex items-center dark:hover:bg-[#323130] hover:bg-slate-100 transition-all gap-2 pl-2'>
          <AiFillDelete className='text-[23px] dark:text-white'/>
          <span className="py-2 dark:text-white">Delete</span>
          </div>
          </div>
          
        </div>
      )}
    </>
  )
}

export default SideBar
