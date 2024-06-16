import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axiosInstance from "../../axios/axiosInstance";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const onSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post("/login", {
      email: state.email,
      password: state.password,
    }).then((response) => {
      localStorage.setItem("token", response.data.accessToken);
      navigate("/");
    }).catch((error) => {
      console.log(error);
      toast("An error occurred!", { type: "error" });
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="Spotify Logo"
            className="w-32 mx-auto"
          />
          <h1 className="text-3xl font-bold mt-4">Sign In</h1>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                onChange={(e) => setState({ ...state, password: e.target.value })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition"
            onClick={onSubmit}
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
