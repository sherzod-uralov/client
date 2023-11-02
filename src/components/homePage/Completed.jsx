import React, { useEffect, useState } from 'react'
import {
  AiOutlineEllipsis,
  AiFillStar,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'
import { GoLightBulb } from 'react-icons/go'
import { CgRadioCheck } from 'react-icons/cg'
import { MdOutlineDateRange } from 'react-icons/md'
import { useUserContext } from '../../context/Context'
import axios from 'axios'
import { RxHamburgerMenu } from 'react-icons/rx'
import { LINK } from '../../api/PORT'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { BiPrinter } from 'react-icons/bi'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

const Completed = () => {
  const {
    setImportantCount,
    menu,
    setMEnu,
    importantTodo: listTodo,
    setImportantTodo: setListTodo,
    importantData,
  } = useUserContext()
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [id, setId] = useState('')

  const getData = async () => {
    try {
      const response = await axios.get(`${LINK}/todo`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const clikedMenu = (event, id) => {
    event.preventDefault()
    setId(id)
    setContextMenuVisible(true)
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
  }

  document.addEventListener('click', () => {
    setContextMenuVisible(false)
  })

  const newData = listTodo?.data?.filter((e) => e.completed === true)

  setImportantCount(newData?.length)

  useEffect(() => {
    getData()
  }, [])

  return (
    <div
      className={`pt-16 ${
        !menu ? 'md:ml-[292px]' : 'md:ml-0'
      } ${'ml-0'} px-6 day w-full  dark:bg-[#11100e]`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <RxHamburgerMenu
              onClick={() => setMEnu(!menu)}
              className={` dark:text-white ${menu ? 'block' : 'hidden'}`}
            />
            <AiOutlineCheckCircle
              className={` ${
                menu ? 'hidden' : 'block'
              } text-[20px] dark:text-white text-[#2765cf] fill-[#2765cf]`}
            />
            <h3 className="font-extrabold text-[18px] text-[#2765cf]">
              Completed
            </h3>
            <AiOutlineEllipsis className="text-[25px] text-[#2765cf]" />
            <div className="dark:text-white"></div>
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
      <div className="mt-3 flex flex-col gap-2">
        {newData?.map((e) => (
          <div

            className="rounded-md relative shadow-md  bg-white dark:bg-[#252422] h-[55px] flex items-center"
            key={e.todo_id}
          >
            <div className="flex items-center w-full px-4 justify-between">
              <div className="flex gap-2 items-center">
                <div>
                  {e.completed ? (
                    <AiFillCheckCircle className="left-2 text-blue-500 text-xl" />
                  ) : (
                    <CgRadioCheck className="left-2 text-blue-500 text-xl" />
                  )}
                </div>
                <h2
                  className={`text-black dark:text-white ${
                    e.completed ? 'line-through' : ''
                  } transition-all`}
                >
                  {e.list_todo}
                </h2>
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

export default Completed
