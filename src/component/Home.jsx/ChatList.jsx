import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import ChatCard from "./ChatCard";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const ChatList = () => {
  const [search, setSearch] = useState("");
  const [showInputBox, setShowInputBox] = useState(false); // <-- New
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="w-full sm:w-[35%] lg:w-[30%] pt-8 lg:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#FCFCFC]">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl sm:text-black font-semibold">Chat</h2>
          <button
            onClick={() => setShowInputBox(true)} // <-- New
            className="px-5 py-2 font-semibold text-xl bg-gray-200 text-[#32375C] hover:text-white rounded hover:bg-gray-500 duration-100 cursor-pointer"
          >
            <FaUserPlus />
          </button>
        </div>

        {/* Conditional Email Input Box */}
        {showInputBox && (
          <div className="relative mt-4">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full pl-4 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
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

      {/* Chat List */}
      <div className="px-4 flex flex-col gap-1.5">
        {[1, 2, 3, 4, 5].map((chatId) => (
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


