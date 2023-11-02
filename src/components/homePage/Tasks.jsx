import React, { useEffect, useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { AiOutlineEllipsis, AiFillStar } from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'
import { GoLightBulb } from 'react-icons/go'
import { CgRadioCheck } from 'react-icons/cg'
import { MdOutlineDateRange } from 'react-icons/md'
import { useUserContext } from '../../context/Context'
import axios from 'axios'
import { LINK } from '../../api/PORT'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { BiPrinter } from 'react-icons/bi'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const Important = () => {
  const [todo, setTodo] = useState('')
  const {setImportantCount,importantData:getData,importantTodo:listTodo,setImportantTodo:setListTodo,importantData} = useUserContext();
  const { listId } = useParams()
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [hidden, setHidden] = useState(localStorage.getItem('setHidden'))
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [id, setId] = useState('')

  const clikedMenu = (event, id) => {
    event.preventDefault()
    setId(id)
    setContextMenuVisible(true)
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
  }

  const checkInportant = async (id) => {
    try {
      await axios.put(
        `${LINK}/todo/${id}`,
        { important: false },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      getData()
    } catch (error) {
      console.log(error)
    }
  }



  document.addEventListener('click', () => {
    setContextMenuVisible(false)
  })

  const deleteList = async (id) => {
    try {
      await axios.delete(`${LINK}/todo/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = async () => {
    if (todo.trim() == '') {
      return false
    }
    try {
      const response = await axios.post(
        `${LINK}/todo`,
        {
          task:true,
          list_todo: todo,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )

      setTodo('')
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const newData = listTodo?.data?.filter((e) => e.task === true);
  
console.log(newData);

  useEffect(() => {
    getData() 
    importantData()
  }, [listId])

  return (
    <div className="pt-16 ml-[292px] px-6 day w-full dark:bg-[#11100e]">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <AiOutlineStar className="text-[22px] fill-[#2765cf]" />
            <h3 className="font-extrabold text-[18px] text-[#2765cf]">
              Task
            </h3>
            <AiOutlineEllipsis className="text-[25px] text-[#2765cf]" />
            <div className="dark:text-white w-16"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <BiSortAlt2 className="text-2xl text-[#2765cf]" />
            <h3 className="font-light text-xs text-[#2765cf]">Sort</h3>
          </div>
          <div className="flex items-center gap-1">
            <GoLightBulb className="text-2xl text-[#2765cf]" />
            <h3 className="font-light text-xs text-[#2765cf]">Suggestion</h3>
          </div>
        </div>
      </div>

      <div className="mt-8 relative flex items-center">
        <CgRadioCheck className="left-2 absolute text-blue-500 text-xl" />
        <input
          required
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo()
            }
          }}
          onClick={() => {
            setHidden(true)
          }}
          placeholder="Add a task"
          className="placeholder:text-[#2765cf] placeholder:text-[13px] pl-10 w-full dark:text-white dark:bg-[#252422] bg-white min-h-[55px] rounded-sm shadow-gray-200 dark:shadow-none shadow-lg outline-none text-lg"
        />
      </div>
      <div
        className={`flex justify-between px-4 items-center w-full h-12 dark:bg-[#252422] bg-[#faf9f7] relative z-[-30] dark:shadow-none ${
          hidden ? 'top-[3px] z-20' : 'top-[-45px]'
        } transition-all rounded-sm shadow-gray-200 shadow-lg`}
      >
        <MdOutlineDateRange className="dark:text-white" />
        <button
          className={`${
            todo == '' ? 'cursor-not-allowed' : 'cursor-pointer'
          }  px-[5px] py-[3px] border-solid dark:text-white dark:border-gray-50 border-gray-500 opacity-[0.3] border-[1.5px]`}
        >
          add
        </button>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {newData?.map((e) => (
          <div
            onContextMenu={(event) => clikedMenu(event, e.todo_id)}
            className="rounded-md relative shadow-md  bg-white dark:bg-[#252422] h-[55px] flex items-center"
            key={e.todo_id}
          >
            <div className="flex items-center w-full px-4 justify-between">
              <div className="flex gap-2 items-center">
                <CgRadioCheck className="left-2 text-blue-500 text-xl" />
                <h2 className="text-black dark:text-white">{e.list_todo}</h2>
              </div>
              <div onClick={() => checkInportant(e.todo_id)}>
                {e.important ? (
                  <AiFillStar className="text-[#316cd0] text-xl" />
                ) : (
                  <AiOutlineStar className="text-[#316cd0] text-xl" />
                )}
              </div>
            </div>
          </div>
        ))}
        {contextMenuVisible && (
          <div
            className="context-menu absolute transition-colors"
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
          >
            <div className="flex bg-white dark:bg-[#252422] dark:shadow-custom-dark shadow-custom flex-col w-56 rounded-[4px] h-30 transition-colors">
              <div
                onClick={() => setIsRenaming(id)}
                className="cursor-pointer flex mt-2 items-center dark:hover:bg-[#323130] hover:bg-slate-100 transition-all gap-2 pl-2"
              >
                <MdOutlineDriveFileRenameOutline className="dark:text-white text-[23px] text-[#605e5c]" />
                <span className="py-2 text-[#605e5c] dark:text-white">
                  Reneme
                </span>
              </div>
  
              <div className="cursor-pointer flex items-center dark:hover:bg-[#323130] hover:bg-slate-100 transition-all gap-2 pl-2">
                <BiPrinter className="text-[23px] text-[#605e5c] dark:text-white" />
                <span className="py-2 text-[#605e5c] dark:text-white">
                  Print
                </span>
              </div>
              <span className="block h-[1px] w-full bg-black opacity-[0.2]"></span>
              <div
                onClick={() => deleteList(id)}
                className="cursor-pointer flex items-center dark:hover:bg-[#323130] hover:bg-slate-100 transition-all gap-2 pl-2"
              >
                <AiFillDelete className="text-[23px] text-red-500 dark:text-red-400" />
                <span className="py-2 text-red-500 dark:text-red-400">
                  Delete list
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Important
