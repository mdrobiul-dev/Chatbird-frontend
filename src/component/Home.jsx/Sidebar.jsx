import MenuElement from "./MenuElement";
import { RiGroupLine } from "react-icons/ri";
import { BiMessage } from "react-icons/bi";
import { CgMenuRound } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

function Sidebar() {
  return (
    // bg-[#FFFFFF] shadow-[1px_0px_5px_0px_#00000014]
    <div className="hidden lg:flex w-[10%] mt-20 flex-col self-start rounded">
      <h1 className="pl-2.5 font-bold text-2xl mb-18 lg:pl-0 lg:text-lg xl:pl-2.5 xl:text-2xl mt-20 cursor-pointer hover:text-white duration-300">ChattBird</h1>
      
      <div className="flex flex-col gap-5">
        <MenuElement icon={BiMessage} text="Chat" />
        <MenuElement icon={RiGroupLine} text="Group" />
        <MenuElement icon={CgMenuRound} text="People" />
      </div>

      {/* AVATAR + NAME together in flex */}
      <div className="mt-12 text-center cursor-pointer">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/avatar_1.jpg" alt="Avatar" className="object-cover w-full h-full" />
          </div>
        </div>

      </div>

        <div className="robi cursor-pointer">
          <h2 className="text-sm text-center font-semibold font-nunito hover:text-white duration-100">Robiul Hassan Robi</h2>
        </div>
          <div className="mt-10 m-auto bg-pink-300 hover:bg-pink-400 rounded-full p-2.5 cursor-pointer mb-12">
          <MdLogout  className="text-2xl"/>
          </div>
    </div>
  );
}

export default Sidebar;

