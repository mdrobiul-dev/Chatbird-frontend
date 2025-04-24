import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import ChatCard from "./ChatCard";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="w-full sm:w-[35%] lg:w-[30%] pt-10 lg:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#FCFCFC]">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-black font-semibold">Chat</h2>
          <button className="px-4 py-1 font-semibold text-xl text-[#32375C] hover:text-white border border-[#32375C] rounded hover:bg-gray-500 duration-100 cursor-pointer">
            Add
          </button>
        </div>

        {/* Search Box */}
        <div className="relative cursor-pointer">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <SlMagnifier className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 mb-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          />
        </div>
      </div>

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

