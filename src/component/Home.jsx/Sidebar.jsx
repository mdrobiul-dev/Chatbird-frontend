// Sidebar.jsx
function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col items-center w-20 bg-white border-r p-4">
      <div>
        <img
          src="/avatar_1.jpg"
          alt="Description of image"
          class="max-w-full max-h-full object-cover"
        />
      </div>
      <div className="mb-8">
        <img
          src="/avatar_1.png"
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Navigation options */}
      <div className="flex flex-col space-y-6">
        <button className="text-gray-600 hover:text-black">Chat</button>
        <button className="text-gray-600 hover:text-black">Group</button>
        <button className="text-gray-600 hover:text-black">People</button>
      </div>
              </aside>
  );
}

export default Sidebar;
