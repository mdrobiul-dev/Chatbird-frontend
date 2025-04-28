import React from "react";
import Sidebar from "../component/Home.jsx/Sidebar";
import ChatList from "../component/Home.jsx/ChatList";
import Inbox from "../component/Home.jsx/Inbox";

const Home = () => {
  return (
    <div className="flex h-screen bg-[#a82929] gap-4 p-4">
      <Sidebar />
      <ChatList />
      <Inbox />
    </div>
  );
};

export default Home;
