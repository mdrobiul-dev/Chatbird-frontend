import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loggedUser } from "../store/auth/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await authServices.login(loginData);
      toast.success(res.message);
      dispatch(loggedUser(res.user));
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      console.log(error);
      toast.error(message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm px-4">
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
      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
            ChattBird
          </h1>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue your conversations
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
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
                  setloginData((prev) => ({ ...prev, email: e.target.value }))
                }
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setloginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all duration-200 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-pink-500 hover:text-pink-600"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-sky-500 hover:text-sky-600 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;  
