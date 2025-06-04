import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Registration = () => {
  const navigate = useNavigate();

  const [regData, setregData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleReg = async (e) => {
    e.preventDefault();
    try {
      const res = await authServices.registration(regData);
      localStorage.setItem("userEmail", regData.email);
      toast.success(res.success);
      setTimeout(() => {
        navigate("/veriefy-email");
      }, 2000);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm px-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
            ChattBird
          </h1>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to start chatting
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleReg} className="space-y-5">
          <div className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                onChange={(e) =>
                  setregData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                id="fullname"
                name="fullname"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                onChange={(e) =>
                  setregData((prev) => ({ ...prev, email: e.target.value }))
                }
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  setregData((prev) => ({ ...prev, password: e.target.value }))
                }
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 pr-12"
                placeholder="at least 8 characters, number, uppercase"
              />
              <div
                className="absolute right-3 top-[42px] text-xl text-gray-600 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-sky-500 hover:text-sky-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;

