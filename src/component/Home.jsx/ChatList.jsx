// ChatList.jsx
import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import ChatCard from "./ChatCard";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { RiMenuLine } from "react-icons/ri";

const ChatList = ({ onMenuClick }) => {
  const [search, setSearch] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="w-full sm:w-[35%] lg:w-[30%] mt-5 sm:mt-10 pt-2 lg:shadow-[1px_0px_5px_0px_#00000014] bg-white/80 backdrop-blur-md self-start pb-10 h-[95%] sm:h-[90%] flex flex-col rounded">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl sm:text-black font-semibold hidden sm:block">Chat</h2>
          <button onClick={onMenuClick} className="sm:hidden text-2xl text-black">
            <RiMenuLine />
          </button>
          <button
            onClick={() => setShowInputBox(true)}
            className="px-5 py-2 font-semibold text-xl bg-[#f5d2fee5] text-black hover:text-[#6161c1] rounded hover:bg-[#e5b3f2e5] duration-100 cursor-pointer"
          >
            <FaUserPlus />
          </button>
        </div>

        {showInputBox && (
          <div className="relative mt-4">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full pl-4 pr-10 py-2 bg-white/20 backdrop-blur-md shadow-[1px_2px_2px_0px_#00000024] rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <div className="flex justify-center gap-5 mt-2">
              <button
                className="px-5 py-1 bg-gray-300 text-[#32375C] hover:text-white rounded hover:bg-gray-500"
                onClick={() => setShowInputBox(false)}
              >
                Add
              </button>
              <button
                className="px-6 py-1 bg-gray-300 text-[#32375C] rounded hover:bg-red-300"
                onClick={() => setShowInputBox(false)}
              >
                <ImCross />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mx-4 flex flex-col gap-1.5 overflow-y-auto min-h-0 flex-1 scrollbar-hide">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((chatId) => (
          <div
            key={chatId}
            onClick={() => handleChatClick(chatId)}
            className="cursor-pointer"
          >
            <ChatCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;



