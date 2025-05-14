const ChatListLoading = () => {
  const skeletonItems = Array(6).fill(null);

  return (
     <div className="p-3 space-y-3">
      {skeletonItems.map((_, idx) => (
        <div
          key={idx}
          className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm dark:bg-gray-800 animate-pulse"
        >
          {/* Left: Avatar + Text */}
          <div className="flex items-center space-x-4 w-full">
            <div className="w-12 h-12 bg-gray-300 rounded-full shrink-0"></div>
            <div className="flex-1 space-y-2 overflow-hidden">
              <div className="w-3/5 h-4 bg-gray-300 rounded"></div> {/* Name */}
              <div className="w-4/5 h-3 bg-gray-200 rounded"></div> {/* Message */}
            </div>
          </div>

          {/* Right: Timestamp */}
          <div className="w-10 h-3 bg-gray-200 rounded ml-4 shrink-0"></div>
        </div>
      ))}
    </div>
  );
};

export default ChatListLoading;