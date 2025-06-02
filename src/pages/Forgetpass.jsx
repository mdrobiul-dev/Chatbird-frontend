import { useState } from "react";
import axios from "axios";
import { authServices } from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const res = await authServices.forgetpassword( email );
      toast.success(res.message);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm px-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          width: "320px",
          zIndex: 9999,
        }}
        toastStyle={{
          marginBottom: "0.75rem",
        }}
      />
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 drop-shadow-sm">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white/80 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-400 text-white py-2 rounded-md hover:bg-pink-500 transition disabled:opacity-50 shadow-md"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
