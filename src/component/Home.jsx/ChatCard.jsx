import React from "react";

const ChatCard = () => {
  return (
    <div className="group flex items-center justify-between hover:bg-[#f5c6f9c3] duration-100 p-4 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/avatar_1.jpg"
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-semibold  text-[#222222]">
            Smokey_ricin
          </span>
          <span className="text-gray-400 text-sm group-hover:text-black">
            whats up boy....
          </span>
        </div>
      </div>

      <span className="text-gray-400 text-xs ">
        10:30 PM
      </span>
    </div>
  );
};

export default ChatCard;
