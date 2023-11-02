import React, { useEffect, useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { GoLightBulb } from 'react-icons/go'
import { CgRadioCheck } from 'react-icons/cg'
import { useUserContext } from '../context/Context'
import {
  AiOutlineStar,
  AiFillDelete,
  AiOutlineEllipsis,
  AiFillCheckCircle,
} from 'react-icons/ai'
import { BiPrinter, BiSortAlt2 } from 'react-icons/bi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { RxHamburgerMenu } from 'react-icons/rx'
import { GrStatusGood } from 'react-icons/gr'
import { AiFillStar } from 'react-icons/ai'
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineContentCopy,
  MdOutlineDateRange,
} from 'react-icons/md'
import axios from 'axios'
import { LINK } from '../api/PORT'
const sound = new Audio('../sound/sound.mp3')
const HomePage = () => {
  const [todo, setTodo] = useState('')
  const [listTodo, setListTodo] = useState('')
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [id, setId] = useState('')
  const [copyMenu, setCopyMenu] = useState(false)
  const {
    menu,
    setMEnu,
    importantData,
    getData: sideBar,
    importantCount,
  } = useUserContext()
  const [text, setText] = useState()

  if (copyMenu == true) {
    setTimeout(() => {
      setCopyMenu(false)
    }, 1000)
  }
  const clikedMenu = (event, id, text) => {
    setText(text)
    setId(id)
    event.preventDefault()
    setContextMenuVisible(true)
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
  }

  document.addEventListener('click', () => {
    setContextMenuVisible(false)
  })

  const completed = async (id, completed) => {
    try {
      await axios.put(
        `${LINK}/todo/${id}`,
        {
          completed: !completed,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      getData()
    } catch (error) {
      console.log(error)
    } finally {
      sound.play()
    }
  }

  const deleteList = async (id) => {
    try {
      await axios.delete(`${LINK}/todo/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      getData()
      importantData()
      sideBar()
    } catch (error) {
      console.log(error)
    }
  }

  const markImportant = async (id, important) => {
    try {
      await axios.put(
        `${LINK}/todo/${id}`,
        { important: !important },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      getData()
      sideBar()
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(`${LINK}/todo`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      setListTodo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addMyday = async () => {
    if (todo.trim() == '') {
      return false
    }
    try {
      const response = await axios.post(
        `${LINK}/todo`,
        {
          my_day: true,
          task: true,
          list_todo: todo,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      getData()
      importantData()
      sideBar()
      setTodo('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const newData = listTodo?.data?.filter((e) => e?.my_day === true)

  const currentDate = new Date()
  const [hidden, setHidden] = useState(localStorage.getItem('setHidden'))
  const formattedDate = `${currentDate.toLocaleString('en-US', {
    weekday: 'long',
  })}, ${currentDate.toLocaleString('en-US', {
    month: 'long',
  })} ${currentDate.getDate()}`

  return (
    <div
      className={`pt-16 ${
        !menu ? 'md:ml-[292px]' : 'md:ml-0'
      } ${'ml-0'} px-6 day w-full  dark:bg-[#11100e]`}
    >
      <div
        className={`absolute flex items-center gap-2 bg-green-500 py-2 px-3 transition ${
          copyMenu ? 'top-30' : 'top-[-50%]'
        }  rounded-sm' style={{ left: '50%', transform: 'translate(-50%)}}`}
      >
        <GrStatusGood className="dark:fill-white" />
        <h2 className="dark:text-white">Last response copied to clipboard</h2>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <RxHamburgerMenu
              onClick={() => setMEnu(!menu)}
              className={` dark:text-white ${menu ? 'block' : 'hidden'}`}
            />
            <BsSun
              className={` ${
                menu ? 'hidden' : 'block'
              } text-[20px] dark:text-white`}
            />
            <h3 className="font-extrabold text-[22px] dark:text-white">
              My day
            </h3>
            <AiOutlineEllipsis className="text-[20px] dark:text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <BiSortAlt2 className="text-2xl text-[#605e5c] dark:text-white" />
            <h3 className="font-light text-xs text-[#605e5c] dark:text-white">
              Sort
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <GoLightBulb className="text-2xl text-[#605e5c] dark:text-white" />
            <h3 className="font-light text-xs text-[#605e5c] dark:text-white">
              Suggestion
            </h3>
          </div>
        </div>
      </div>
      <span className="font-extrabold text-[12px] opacity-[0.5] dark:text-white dark:opacity-[0.8]">
        {formattedDate}
      </span>
      <div className="mt-8 relative flex items-center">
        <CgRadioCheck className="left-2 absolute text-blue-500 text-xl" />
        <input
          required
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addMyday()
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
            onContextMenu={(event) => clikedMenu(event, e.todo_id, e.list_todo)}
            className="rounded-md relative  bg-white dark:bg-[#252422] h-[55px] flex items-center"
            key={e.id}
          >
            <div className="flex items-center w-full px-4 justify-between">
              <div className="flex gap-2 items-center">
                <div onClick={() => completed(e.todo_id, e.completed)}>
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
                >{e.list_todo}</h2>
              </div>
              {e.important ? (
                <AiFillStar
                  onClick={() => markImportant(e.todo_id, e.important)}
                  className="text-[#316cd0] text-xl"
                />
              ) : (
                <AiOutlineStar
                  onClick={() => markImportant(e.todo_id, e.important)}
                  className="text-[#316cd0] text-xl"
                />
              )}
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
              <CopyToClipboard text={text}>
                <div
                  onClick={() => setCopyMenu(true)}
                  className="cursor-pointer flex items-center dark:hover:bg-[#323130] hover:bg-slate-100 transition-all gap-2 pl-2"
                >
                  <MdOutlineContentCopy className="text-[23px] text-[#605e5c] dark:text-white" />
                  <span className="py-2 text-[#605e5c] dark:text-white">
                    Copy
                  </span>
                </div>
              </CopyToClipboard>
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

export default HomePage
