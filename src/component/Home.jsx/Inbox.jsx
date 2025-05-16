import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage, sendMessages } from "../../store/auth/chatlistSlice";
import { initSoket } from "../../services/soket";

const Inbox = () => {
  const [content, setcontent] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectConversation = useSelector(
    (state) => state.chatList.selectedConversation
  );

  const messages = useSelector((state) => state.chatList.messages);

  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (selectConversation?._id) {
      dispatch(fetchMessage(selectConversation._id));
    }
  }, [selectConversation]);

  useEffect(() => {
    initSoket()
  },[])

  let other = null;

  if (selectConversation) {
    other =
      selectConversation.creator._id === userData._id
        ? selectConversation.participant
        : selectConversation.creator;
  }

  const hansdleMessageSend = (e) => {
    e.preventDefault();
   
    dispatch(sendMessages({reciverId: other._id, content, conversationId: selectConversation._id}))
    setcontent("");
  };

  if (!selectConversation) {
    return (
      <div className="w-full sm:w-[65%] lg:w-[60%] flex items-center justify-center bg-gradient-to-br from-pink-100/30 via-pink-50/30 to-sky-100/30 backdrop-blur-md border border-white/30 shadow-lg mt-1 self-start h-[98%] rounded-xl">
        <div className="text-center text-gray-500 text-lg font-medium p-6">
          Select a conversation to get started
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-[65%] lg:w-[60%] flex flex-col bg-gradient-to-br from-pink-100/30 via-pink-50/30 to-sky-100/30 backdrop-blur-md border border-white/30 shadow-lg mt-1 self-start h-[98%] rounded-xl">
      <div className="flex items-center justify-between bg-white/90 p-4 pt-9 rounded-t-xl shadow-sm">
        <div className="flex items-center gap-3">
          <button
            className="block sm:hidden text-xl text-gray-600 hover:text-pink-500 transition-colors duration-200"
            onClick={() => navigate("/home")}
          >
            <IoChevronBack />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-pink-200 transition-all duration-300 bg-pink-400 flex items-center justify-center text-white font-bold text-lg">
              {other?.avatar ? (
                <img
                  src={other?.avatar}
                  alt={other?.fullName}
                  className="object-cover w-full h-full"
                />
              ) : (
                other?.fullName?.charAt(0).toUpperCase()
              )}
            </div>

            <span className="font-semibold text-gray-700">
              {other?.fullName}
            </span>
          </div>
        </div>

        {/* Right Side: Call & More Options */}
        <div className="flex items-center gap-4 text-xl">
          <IoCallOutline className="cursor-pointer text-sky-500 hover:text-sky-600 transition-colors duration-200" />
          <IoVideocamOutline className="cursor-pointer text-sky-500 hover:text-sky-600 transition-colors duration-200" />
          <PiDotsThreeVerticalBold className="cursor-pointer text-pink-500 hover:text-pink-600 transition-colors duration-200" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm mt-10">
            No messages yet.
          </div>
        ) : (
          messages.map((message) => {
            const isSentByCurrentUser = message.sender === userData._id;

            return (
              <div
                key={message._id}
                className={`flex ${
                  isSentByCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm max-w-xs md:max-w-md ${
                    isSentByCurrentUser
                      ? "bg-gradient-to-r from-pink-400 to-sky-400 text-white shadow-md"
                      : "bg-white/90 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Input */}
      <form
        onSubmit={hansdleMessageSend}
        className="p-4 flex items-center gap-3  bg-gradient-to-br from-pink-100/50 via-pink-50/50 to-sky-100/50 backdrop-blur-md rounded-b-xl"
      >
        <input
          onChange={(e) => setcontent(e.target.value)}
          type="text"
          value={content}
          placeholder="Type your message..."
          className="flex-1 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
        />
        <div className="flex items-center gap-2 text-xl">
          <MdOutlineSentimentNeutral className="cursor-pointer text-sky-500 hover:text-sky-600 transition-colors duration-200" />
          <IoImageOutline className="cursor-pointer text-sky-500 hover:text-sky-600 transition-colors duration-200" />
          <button type="submit">
            {" "}
            <IoMdSend className="cursor-pointer text-pink-500 hover:text-pink-600 transition-colors duration-200" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inbox;
