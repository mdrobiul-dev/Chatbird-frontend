import MenuElement from "./MenuElement";
import { RiGroupLine } from "react-icons/ri";
import { BiMessage } from "react-icons/bi";
import { CgMenuRound } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

function Sidebar({ onClose, onAvatarClick }) {
  const userData = useSelector((state) => state.auth.user);

  const getInitial = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="w-full lg:w-[10vw] mt-20 flex flex-col self-start rounded-lg md:bg-gradient-to-br from-pink-300/20 via-pink-200/20 to-sky-300/20 md:backdrop-blur-md p-4 md:border md:border-white/20 md:shadow-lg">
      {onClose && (
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-2xl text-gray-700 hover:text-pink-500 transition-colors duration-200"
          >
            <IoClose />
          </button>
        </div>
      )}
      <div className="pr-0.5 font-bold text-2xl mb-18 lg:text-lg xl:text-2xl mt-4 cursor-pointer bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
        <h1>ChattBird</h1>
      </div>
      <div className="flex flex-col gap-5 mt-6">
        <MenuElement
          icon={BiMessage}
          text="Chat"
          iconClass="text-pink-500 group-hover:text-white"
          textClass="group-hover:text-white"
        />
        <MenuElement
          icon={RiGroupLine}
          text="Group"
          iconClass="text-sky-500 group-hover:text-white"
          textClass="group-hover:text-white"
        />
        <MenuElement
          icon={CgMenuRound}
          text="People"
          iconClass="text-pink-400 group-hover:text-white"
          textClass="group-hover:text-white"
        />
      </div>
      <div
        className="mt-12 text-center cursor-pointer group"
        onClick={onAvatarClick}
      >
        <div className="avatar group-hover:ring-2 group-hover:ring-pink-300 transition-all duration-300">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-pink-200 transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-pink-400 to-sky-400 text-white font-semibold">
            {userData.avatar ? (
              <img
                src={userData.avatar}
                alt="Avatar"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              getInitial(userData.fullName)
            )}
          </div>
        </div>
        <h2 className="text-sm mt-2 font-semibold text-gray-700 group-hover:text-pink-500 transition-colors duration-300">
          {userData.fullName}
        </h2>
      </div>
      <a
        href="/login"
        className="mt-10 m-auto bg-gradient-to-br from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 rounded-full p-2.5 cursor-pointer mb-12 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <MdLogout className="text-2xl text-white" />
      </a>
    </div>
  );
}

export default Sidebar;


