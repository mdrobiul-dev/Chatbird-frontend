import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authServices } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const { randomString } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus("Passwords do not match");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await authServices.resetpassword(randomString, email, password);
      toast.success(res.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      console.log(error);
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
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Reset Your Password
        </h2>

        <form onSubmit={handleReset}>
          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
            />
            <div
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition disabled:opacity-50 shadow-md"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center font-medium text-sm text-gray-700">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

