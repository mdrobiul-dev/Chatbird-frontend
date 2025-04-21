import React from "react";
import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import ChatCard from "./ChatCard";
const ChatList = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-[30%]">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Chat</h2>
          <button className="px-4 py-1 font-semibold text-xl text-[#32375C] hover:text-white border border-[#32375C]  rounded hover:bg-gray-500 duration-100 cursor-pointer">
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
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </div>
  );
};

export default ChatList;
