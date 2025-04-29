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
    <div className="flex px-2 h-screen bg-amber-400 gap-1">
      <Sidebar />
      <ChatList />
      <Inbox />
    </div>
  );
};

export default ResponsiveHome;
