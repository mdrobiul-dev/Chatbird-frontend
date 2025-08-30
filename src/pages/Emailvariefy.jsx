import React, { useState } from "react";
import { authServices } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Emailvariefy = () => {
  const navigation = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);

  const email = localStorage.getItem("userEmail");

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    console.log("Entered Code:", enteredCode);
    try {
      const res = await authServices.emailvariefication(email, enteredCode);
      toast.success(res.success);
      localStorage.removeItem("userEmail");
      setTimeout(() => {
        navigation("/login");
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

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await authServices.resentOtp(email);
      toast.success(res.message);
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm">
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
      
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
            ChattBird
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We've sent a 4-digit code to your email
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-4 mb-8">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`digit-${idx}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-16 h-16 text-3xl text-center border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/90 transition-all duration-200"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
          >
            Verify Account
          </button>
          
          <button
            type="button"
            onClick={handleResendOtp}
            className="w-full mt-4 py-2 px-4 bg-white/90 border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
          >
            Resend Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default Emailvariefy;             
