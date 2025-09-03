import { CgProfile } from "react-icons/cg";
import { SlBubbles } from "react-icons/sl";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";

import { useUser } from "../contexts/UserContext";
import LogOutButton from "./LogOutButton";

function Header() {

  const { currentUser } = useUser()

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
            <div className="flex flex-col items-center">
              <CgProfile />
              <p className="text-black text-sm">{ currentUser == null ? '' : currentUser.userName }</p>
            </div>

            <div className="flex flex-col items-center text-center justify-center">
              <LogOutButton />
            </div>
        </div>
    </div>
  )
}
export default Header