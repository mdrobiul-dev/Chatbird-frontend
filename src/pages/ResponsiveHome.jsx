import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../component/Home.jsx/Sidebar";
import ChatList from "../component/Home.jsx/ChatList";
import Inbox from "../component/Home.jsx/Inbox";

const ResponsiveHome = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) setShowMobileSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isChatPage = location.pathname.startsWith("/chat/");

  return (
    <div className="relative flex px-2 h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm gap-2">
      {/* Sidebar for lg and above */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Sidebar drawer for mobile (shown below lg) */}
      {windowWidth < 1024 && showMobileSidebar && (
        <div className="absolute z-50 inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-md shadow-lg rounded-r-md">
          <Sidebar onClose={() => setShowMobileSidebar(false)} />
        </div>
      )}

      {/* Below sm (640px) - mobile behavior */}
      {windowWidth < 640 ? (
        <>
          {isChatPage ? (
            <Inbox />
          ) : (
            <ChatList onMenuClick={() => setShowMobileSidebar(true)} />
          )}
        </>
      ) : (
        /* From sm (640px) up - show both */
        <>
          <ChatList onMenuClick={() => setShowMobileSidebar(true)} />
          <Inbox />
        </>
      )}
    </div>
  );
};

export default ResponsiveHome;








// if (isMobile) {
//   if (location.pathname === "/") return <ChatList />;
//   if (location.pathname.startsWith("/chat/")) return <Inbox />;
// }

// return (
//   <div className="flex px-2 h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm gap-2">
//     <Sidebar />
//     <ChatList />
//     <Inbox />
//   </div>
// );
// };
