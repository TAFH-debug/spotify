import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axios/axiosInstance";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      toast("Passwords do not match!", { type: "error" });
      return;
    }

    axiosInstance.post("/register", {
        email: state.email,
        password: state.password,
    }).then((response) => {
      navigate("/signin");
    }).catch((error) => {
      console.log(error);
      toast("An error occurred!", { type: "error" });
    });
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (<>
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="Spotify Logo"
            className="w-32 mx-auto"
          />
          <h1 className="text-3xl font-bold mt-4">Sign Up</h1>
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
                placeholder="Create a password"
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
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Confirm your password"
                onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
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
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>);
};
