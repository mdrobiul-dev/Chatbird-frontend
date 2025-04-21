import React from "react";
import { IoCallOutline, IoVideocamOutline, IoImageOutline } from "react-icons/io5";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const Inbox = () => {
  return (
    <div className="w-[60%] flex flex-col bg-white border-l">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/avatar_1.jpg" alt="Avatar" className="object-cover w-full h-full" />
          </div>
          <span className="font-semibold">Jenny Wilson</span>
        </div>

        {/* Call and More Options */}
        <div className="flex items-center gap-4 text-xl text-gray-600">
          <IoCallOutline className="cursor-pointer hover:text-black" />
          <IoVideocamOutline className="cursor-pointer hover:text-black" />
          <PiDotsThreeVerticalBold className="cursor-pointer hover:text-black" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example messages */}
        <div className="flex justify-start">
          <div className="bg-gray-100 px-4 py-2 rounded-md text-sm">Hi</div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#5c5f80] text-white px-4 py-2 rounded-md text-sm">Hlw</div>
        </div>

        <div className="flex justify-start">
          <div className="bg-gray-100 px-4 py-2 rounded-md text-sm">Hi</div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#5c5f80] text-white px-4 py-2 rounded-md text-sm">Hlw</div>
        </div>

        <div className="flex justify-start">
          <div className="bg-gray-100 px-4 py-2 rounded-md text-sm">Hi</div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#5c5f80] text-white px-4 py-2 rounded-md text-sm">Hlw</div>
        </div>
      </div>

      {/* Bottom Input */}
      <div className="p-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Text Here"
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <div className="flex items-center gap-2 text-xl text-gray-600">
          <MdOutlineSentimentNeutral className="cursor-pointer hover:text-black" />
          <IoImageOutline className="cursor-pointer hover:text-black" />
          <IoMdSend className="cursor-pointer hover:text-indigo-600" />
        </div>
      </div>
    </div>
  );


  
};

export default Inbox;


