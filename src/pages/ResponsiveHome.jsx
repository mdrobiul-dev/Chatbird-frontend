import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../component/Home.jsx/Sidebar";
import ChatList from "../component/Home.jsx/ChatList";
import Inbox from "../component/Home.jsx/Inbox";
import Profile from "./Profile";

const ResponsiveHome = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  const isChatPage = location.pathname.startsWith("/home/chat/");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) setShowMobileSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex px-2 h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm gap-2">
      {/* Sidebar for lg and above */}
      <div className="hidden lg:flex">
        <Sidebar onAvatarClick={() => setShowProfile(true)} />
      </div>

      {/* Sidebar drawer for mobile */}
      {windowWidth < 1024 && showMobileSidebar && (
        <div className="absolute z-50 inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-md shadow-lg rounded-r-md">
          <Sidebar
            onClose={() => setShowMobileSidebar(false)}
            onAvatarClick={() => {
              setShowMobileSidebar(false);
              setShowProfile(true);
            }}
          />
        </div>
      )}

      {/* Main Content Logic */}
      {showProfile ? (
        <Profile onBack={() => setShowProfile(false)} />
      ) : windowWidth < 640 ? (
        isChatPage ? (
          <Inbox />
        ) : (
          <ChatList onMenuClick={() => setShowMobileSidebar(true)} />
        )
      ) : (
        <>
          <ChatList onMenuClick={() => setShowMobileSidebar(true)} />
          <Inbox />
        </>
      )}
    </div>
  );
};

export default ResponsiveHome;
