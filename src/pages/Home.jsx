import React from "react";
import Sidebar from "../component/Home.jsx/Sidebar";
import ChatList from "../component/Home.jsx/ChatList";
import Inbox from "../component/Home.jsx/inbox";
const Home = () => {
  return (
    <div className="flex px-2 pt-12 h-screen">
      <Sidebar />
      <ChatList />
      <Inbox />
    </div>
  );
};

export default Home;
