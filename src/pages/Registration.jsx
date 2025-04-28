import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();

  const [regData, setregData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
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
      <div className="container max-w-md mx-auto space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <h1 className="bg-blue-700 text-white rounded-full px-6 py-2 font-nunito text-lg font-semibold">
            ChatApp
          </h1>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-900 font-nunito">
            Get started with easily register
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-nunito">
            Free register and you can enjoy it
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleReg} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="flex flex-col items-center">
              <label
                className="block text-xs text-gray-500 mb-1 text-center w-full font-nunito"
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
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Full Name Field */}
            <div className="flex flex-col items-center">
              <label
                className="block text-xs text-gray-500 mb-1 text-center w-full font-nunito"
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
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col items-center">
              <label
                className="block text-xs text-gray-500 mb-1 text-center w-full font-nunito"
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
                type="password"
                required
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-nunito"
            >
              Sign up
            </button>
            <p className="text-center text-sm text-gray-600 mt-4 font-nunito">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-600 hover:underline ml-1 font-nunito"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;
