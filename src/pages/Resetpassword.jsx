import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const { randomString } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus("Passwords do not match");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post(
        `/api/v1/auth/resetpassword/${randomString}?email=${email}`,
        { password }
      );
      setStatus(response.data.message || "Password reset successful");
    } catch (err) {
      setStatus(
        err.response?.data?.error ||
          err.response?.data ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Reset Your Password
        </h2>

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
            />
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
