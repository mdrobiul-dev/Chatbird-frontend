import React from "react";
import { useState } from "react";
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
   e.preventDefault()
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
    <div className="min-h-screen flex items-center justify-center px-1.5 bg-gray-100">
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
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify your Email
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Enter the 4-digit code we sent to your email
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
                className="w-14 h-14 text-2xl text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Verify
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2  rounded-xl transition duration-300 mt-4"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );     
};

export default Emailvariefy;
