// Sidebar.jsx
import MenuElement from "./MenuElement";
import { RiGroupLine } from "react-icons/ri";
import { BiMessage } from "react-icons/bi";
import { CgMenuRound } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function Sidebar({ onClose }) {
  return (
    <div className="w-full lg:w-[10vw] mt-20 flex flex-col self-start rounded bg-white/20 backdrop-blur-md p-4">
      {onClose && (
        <div className="flex justify-end">
          <button onClick={onClose} className="text-2xl hover:text-white">
            <IoClose />
          </button>
        </div>
      )}
      <h1 className="pl-2.5 font-bold text-2xl mb-18 lg:pl-1 lg:text-lg xl:pl-2.5 xl:text-2xl mt-4 cursor-pointer hover:text-white duration-300">
        ChattBird
      </h1>
      <div className="flex flex-col gap-5 mt-6">
        <MenuElement icon={BiMessage} text="Chat" />
        <MenuElement icon={RiGroupLine} text="Group" />
        <MenuElement icon={CgMenuRound} text="People" />
      </div>
      <div className="mt-12 text-center cursor-pointer">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/avatar_1.jpg" alt="Avatar" className="object-cover w-full h-full" />
          </div>
        </div>
        <h2 className="text-sm mt-2 font-semibold font-nunito hover:text-white duration-100">
          Robiul Hassan Robi
        </h2>
      </div>
      <div className="mt-10 m-auto bg-pink-300 hover:bg-pink-400 rounded-full p-2.5 cursor-pointer mb-12">
        <MdLogout className="text-2xl" />
      </div>
    </div>
  );
}

export default Sidebar;


