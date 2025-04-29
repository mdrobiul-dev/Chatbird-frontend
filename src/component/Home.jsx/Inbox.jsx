import React from "react";
import {
  IoCallOutline,
  IoVideocamOutline,
  IoImageOutline,
} from "react-icons/io5";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const Inbox = () => {
  const navigate = useNavigate();

  return (
      //  <div className="bg-amber-400"><h1>inbox</h1></div>
   <div className="w-full sm:w-[65%] lg:w-[60%] flex flex-col bg-white border-l border-[#D3D3D3] h-screen">
  {/* Top Header */}
  <div className="flex items-center justify-between p-4 pt-9 shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
    {/* Left Side: Back Button + Avatar + Name */}
    <div className="flex items-center gap-3">
      <button
        className="block sm:hidden text-xl text-gray-600 hover:text-black"
        onClick={() => navigate("/")}
      >
        <IoChevronBack />
      </button>

      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src="/avatar_1.jpg" alt="Avatar" className="object-cover w-full h-full" />
        </div>
        <span className="font-semibold">smokey_ricin</span>
      </div>
    </div>

    {/* Right Side: Call & More Options */}
    <div className="flex items-center gap-4 text-xl text-gray-600">
      {[IoCallOutline, IoVideocamOutline, PiDotsThreeVerticalBold].map((Icon, index) => (
        <Icon key={index} className="cursor-pointer hover:text-black" />
      ))}
    </div>
  </div>

  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
    {/** Example Message Structure */}
    {[...Array(10)].map((_, index) => (
      <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
        <div className={`px-4 py-2 rounded-md text-sm ${index % 2 === 0 ? 'bg-gray-100' : 'bg-[#5c5f80] text-white'}`}>
          {index % 2 === 0 ? 'Hi' : 'Hlw'}
        </div>
      </div>
    ))}
  </div>

  {/* Bottom Input */}
  <div className="p-4 flex items-center gap-3">
    <input
      type="text"
      placeholder="Text Here"
      className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
    <div className="flex items-center gap-2 text-xl text-gray-600">
      {[MdOutlineSentimentNeutral, IoImageOutline, IoMdSend].map((Icon, index) => (
        <Icon
          key={index}
          className={`cursor-pointer ${Icon === IoMdSend ? 'hover:text-indigo-600' : 'hover:text-black'}`}
        />
      ))}
    </div>
  </div>
</div>

  );
};

export default Inbox;


