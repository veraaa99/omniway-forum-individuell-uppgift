import { CgProfile } from "react-icons/cg";
import { SlBubbles } from "react-icons/sl";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";

import { useUser } from "../contexts/UserContext";
import LogOutButton from "./LogOutButton";
import { useState } from "react";
import Modal from 'react-modal'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Header() {

  const { currentUser } = useUser()
  const [showLogin, setshowLogin] = useState(false)
  const [showRegister, setshowRegister] = useState(false)

  return (
    <div className="w-full bg-orange-500 h-16 mt-10 flex justify-between px-10 md:px-28 xl:px-40">
      <div className="inline-flex self-center bg-white drop-shadow-md pb-2">
        <h1 className="text-black font-bold text-center text-5xl"><span className="text-orange-500">{'>'}</span>kyh<span className="text-orange-500">{'>'}</span></h1>
      </div>
      <div className="inline-flex gap-5 self-center ">
        <div className="flex flex-col items-center">
          <MdLibraryBooks />
          <p className="text-black text-sm">Kurser</p>
        </div>
        <div className="flex flex-col items-center">
          <IoMdMail />
          <p className="text-black text-sm">Inbox</p>
        </div>
        <div className="flex flex-col items-center">
          <BsQuestionCircleFill />
          <p className="text-black text-sm">Hjälpcenter</p>
        </div>
        <div className="flex flex-col items-center">
          <SlBubbles />
          <p className="text-black text-sm">Forum</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { if (!currentUser) setshowLogin(true) }}>
          <CgProfile />
          <p className="text-black text-sm">{currentUser == null ? '' : currentUser.userName}</p>
        </div>
          
        <div className="flex flex-col items-center text-center justify-center">
           <LogOutButton />
        </div>

        <Modal isOpen={showLogin}
          onRequestClose={() => setshowLogin(false)}
          className='bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20 realtive'
          overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50'>
          <button className="absolute top-2 right-2 text-gray-600">X</button>
          <LoginForm />
          <p className="text-sm my-4">Har du inget konto än? {''}
            <button className="text-blue-500 underline text-sm" onClick={() => { setshowLogin(false); setshowRegister(true) }}>Skapa konto här</button>
          </p>
        </Modal>

        <Modal isOpen={showRegister}
          onRequestClose={() => setshowRegister(false)}
          className='bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20 realtive'
          overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50'>
          <button className="absolute top-2 right-2 text-gray-600">X</button>
          <RegisterForm />
          <p className="text-sm my-4">Har du redan ett konto? {''}
            <button className="text-blue-500 underline text-sm" onClick={() => { setshowLogin(true); setshowRegister(false) }}>Logga in här</button>
          </p>

        </Modal>
      </div>
    </div >
  )
}
export default Header