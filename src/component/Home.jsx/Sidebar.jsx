import MenuElement from "./MenuElement";
import { RiGroupLine } from "react-icons/ri";
import { BiMessage } from "react-icons/bi";
import { CgMenuRound } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

function Sidebar() {
  return (
    <div className="hidden lg:flex flex-[1] pt-12 bg-[#FCFCFC] flex-col">
    {/* Logo */}
    <h1 className="pl-2.5 font-bold text-2xl mb-24 text-center xl:text-left xl:pl-2.5">
      ChattBird
    </h1>
  
    {/* Menu */}
    <div className="flex flex-col gap-5">
      <MenuElement icon={BiMessage} text="Chat" />
      <MenuElement icon={RiGroupLine} text="Group" />
      <MenuElement icon={CgMenuRound} text="People" />
    </div>
  
    {/* User Info */}
    <div className="mt-auto flex items-center gap-2 py-2 px-2 cursor-pointer mb-2">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img src="/avatar_1.jpg" alt="Avatar" className="object-cover w-full h-full" />
      </div>
  
      <div className="flex flex-col">
        <h2 className="text-[10px] font-bold font-nunito whitespace-nowrap">Robiul Hassan Robi</h2>
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold font-nunito">Edit Profile</p>
          <CiSettings className="text-[12px]" />
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Sidebar;

