import React from "react";
import Sidebar from "../component/Home.jsx/Sidebar";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center px-2.5 bg-gradient-to-br from-pink-300 via-pink-200">
      <div className="ml-auto hidden md:block">
      <Sidebar />
      </div>
      <div className=" relative w-full max-w-xl max-h-min flex gap-6 md:gap-8 bg-white text-black p-4 rounded-lg mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <span className="absolute top-4 left-3 text-gray-600">
          <Link to="/home" className="text-2xl"><MdArrowBackIos /></Link>
        </span>
        <div className="my-auto">
          <img className="w-full max-w-xs h-auto sm:max-w-sm md:max-w-md  object-cover rounded-full md:rounded  border-2 border-indigo-400 shadow-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZirTv3YUaHSe-VVIQzwXUHXxb8mnJ-krbg&s"/>
        </div>
        <div className="py-2.5">
          <h3 className="text-2xl font-bold mb-2">Md Robiul</h3>
          <p className="text-gray-400 mb-4">Full Stack Developer | React Enthusiast | UI/UX Designer</p>
          <p className="text-gray-600 mb-4">robiuls33@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;

// <div className="max-w-4xl mx-auto p-6">
//   <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 md:flex md:items-center">
//     {/* Profile Image */}
//     <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
//       <img
//         src="https://via.placeholder.com/150"
//         alt="User Avatar"
//         className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg"
//       />
//     </div>

//     {/* Profile Info */}
//     <div className="md:w-2/3 md:ml-6 text-center md:text-left">
//       <h2 className="text-2xl font-bold mb-2">Jane Doe</h2>
//       <p className="text-gray-300 mb-4">
//         Full Stack Developer | React Enthusiast | UI/UX Designer
//       </p>
//       <div className="space-y-1">
//         <p><span className="font-semibold">Email:</span> jane@example.com</p>
//         <p><span className="font-semibold">Location:</span> San Francisco, CA</p>
//         <p><span className="font-semibold">Website:</span> janedoe.dev</p>
//       </div>
//     </div>
//   </div>
// </div>
