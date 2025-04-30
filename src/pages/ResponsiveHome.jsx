import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../component/Home.jsx/Sidebar";
import ChatList from "../component/Home.jsx/ChatList";
import Inbox from "../component/Home.jsx/Inbox";

const ResponsiveHome = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    if (location.pathname === "/") return <ChatList />;
    if (location.pathname.startsWith("/chat/")) return <Inbox />;
  }

  return (
    <div className="flex px-2 h-screen bg-gradient-to-br from-pink-400 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm gap-2">
      <Sidebar />
      <ChatList />
      <Inbox />
    </div>
  );
};

export default ResponsiveHome;
