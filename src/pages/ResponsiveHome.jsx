// ResponsiveHome.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../component/Home.jsx/Sidebar";
import ChatList from "../component/Home.jsx/ChatList";
import Inbox from "../component/Home.jsx/Inbox";

const ResponsiveHome = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 640;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setShowMobileSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex px-2 h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm gap-2">
      {/* Sidebar for lg and above */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Sidebar drawer for mobile */}
      {isMobile && showMobileSidebar && (
        <div className="absolute z-50 inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-md shadow-lg rounded-r-md">
          <Sidebar onClose={() => setShowMobileSidebar(false)} />
        </div>
      )}

      {isMobile ? (
        location.pathname.startsWith("/chat/") ? (
          <Inbox />
        ) : (
          <ChatList onMenuClick={() => setShowMobileSidebar(true)} />
        )
      ) : (
        <>
          <ChatList />
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
