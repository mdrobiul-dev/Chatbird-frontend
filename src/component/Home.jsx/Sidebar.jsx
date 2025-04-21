import { BiSolidMessage } from "react-icons/bi";
function Sidebar() {
  return <div className="w-[15%] bg-[#FFFFFF]">
      <h1 className="pl-2.5 font-bold text-3xl mb-24">Chatt.</h1>
      <div className="flex py-2 rounded items-center gap-2 ml-6 mr-12 bg-[#32375C]">
      <BiSolidMessage  className="text-[22px] text-center text-white m-3"/>
        <h2 className="font-semibold text-[18px] text-white">Chatt</h2>
      </div>
  </div>;
}

export default Sidebar;
