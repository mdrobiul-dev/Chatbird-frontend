import MenuElement from "./MenuElement";
import { RiGroupLine } from "react-icons/ri";
import { BiMessage } from "react-icons/bi";
import { CgMenuRound } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

function Sidebar() {
  return (
    <div className="w-[10%] bg-[#FFFFFF] flex flex-col">
      <h1 className="pl-2.5 font-bold text-3xl mb-24">Chatt.</h1>
      
      <div className="flex flex-col gap-5">
        <MenuElement icon={BiMessage} text="Chat" />
        <MenuElement icon={RiGroupLine} text="Group" />
        <MenuElement icon={CgMenuRound} text="People" />
      </div>

      {/* AVATAR + NAME together in flex */}
      <div className="mt-auto flex items-center gap-1 p-2 cursor-pointer">
        <div className="avatar">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src="/avatar_1.jpg" alt="Avatar" className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="robi">
          <h2 className="text-[10px] font-bold font-nunito whitespace-nowrap">Robiul Hassan Robi</h2>
          <div className="flex pl-1 gap-3 items-center">
            <p className="text-[10px] font-bold font-nunito">Edit Profile</p>
            <span className="text-[12px]"><CiSettings /></span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;

