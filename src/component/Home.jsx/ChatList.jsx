import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SlMagnifier } from "react-icons/sl";
import ChatCard from "./ChatCard";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { RiMenuLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { chatServices } from "../../services/api";

const ChatList = ({ onMenuClick }) => {
  const [conversationList, setConversationList] = useState([]);
  const [participantemail, setparticipantemail] = useState("");
  const [search, setSearch] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      try {
        const res = await chatServices.conversationList();
        setConversationList(res.success || []);
      } catch (error) {
        const message =
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!";
        toast.error(message);
      }
    })();
  }, []);

  const handleChatClick = (chatId) => {
    navigate(`/home/chat/${chatId}`);
  };

const handleAdd = async (e) => {
     try {
      const res = await chatServices.createconversation(participantemail);
      console.log(res)
      setShowInputBox(false)
     } catch (error) {
      const message =
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!";
        toast.error(message);
        console.log(message);
        
     }
}  

  const filteredConversations = conversationList.filter((conversation) => {
    const other =
      conversation.creator._id === userData._id
        ? conversation.participant
        : conversation.creator;
    return other.fullName.toLowerCase().includes(search.toLowerCase());
  });
  
  return (
    <div className="w-full sm:w-[35%] lg:w-[30%] mt-5 sm:mt-10 pt-2 bg-gradient-to-br from-pink-100/50 via-pink-50/50 to-sky-100/50 backdrop-blur-md self-start pb-10 h-[95%] sm:h-[90%] flex flex-col rounded-xl border border-white/30 shadow-lg">
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onMenuClick}
            className="block lg:hidden text-2xl text-gray-700 hover:text-pink-500 transition-colors duration-200"
          >
            <RiMenuLine />
          </button>
          <h2 className="text-xl font-semibold hidden lg:block bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
            Chats
          </h2>
          <button
            onClick={() => setShowInputBox(true)}
            className="p-2 font-semibold text-xl bg-gradient-to-br from-pink-300/70 to-sky-300/70 text-white rounded-full hover:from-pink-400/80 hover:to-sky-400/80 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FaUserPlus />
          </button>
        </div>

        {showInputBox && (
          <div className="relative mt-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <input
            onChange={(e) =>setparticipantemail(e.target.value)}
              type="email"
              placeholder="Enter email address"
              className="w-full pl-4 pr-10 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
            />
            <div className="flex justify-center gap-4 mt-3">
              <button
                className="px-5 py-1 bg-gradient-to-r from-pink-400 to-sky-400 text-white rounded-lg hover:from-pink-500 hover:to-sky-500 transition-all duration-200"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="px-5 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                onClick={() => setShowInputBox(false)}
              >
                <ImCross />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all duration-200"
          />
          <SlMagnifier className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="mx-4 flex flex-col gap-2 overflow-y-auto min-h-0 flex-1 scrollbar-hide">
        {conversationList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg">No conversations yet</p>
            <p className="text-sm">Start a new chat by clicking the add button</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg">No results found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const other =
              conversation.creator._id === userData._id
                ? conversation.participant
                : conversation.creator;
            // Format the time
            const lastMessageTime = conversation.lastmessage?.createdAt
              ? new Date(conversation.lastmessage.createdAt).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )
              : "Just now";

            return (
              <div
                key={conversation._id}
                onClick={() => handleChatClick(conversation._id)}
                className="cursor-pointer hover:bg-white/50 transition-colors duration-200 rounded-lg"
              >
                <ChatCard
                  name={other.fullName}
                  avatar={other.avatar}
                  message={
                    conversation?.lastmessage?.content || "No messages yet"
                  }
                  time={lastMessageTime}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList; 
