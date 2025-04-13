import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#03045e] to-[#3a0ca3] px-4">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-5xl font-extrabold text-purple-600 mb-2">HELLO!</h1>
          <p className="text-gray-700 mb-8">Welcome back to our community</p>

          <form className="space-y-6">

            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-2 border-purple-500 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>


            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-2 border-purple-500 rounded-md px-4 py-3 text-lg pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute right-4 top-4 text-xl text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>


            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-600" />
                Remember
              </label>
              <button type="button" className="text-purple-600 font-medium hover:underline">
                Forgot Password?
              </button>
            </div>


            <button
              type="submit"
              className="w-full bg-black text-white text-lg font-bold rounded-full py-3 transition-transform duration-300 hover:scale-105"
            >
              LOGIN
            </button>


            <p className="text-center text-gray-700 text-sm mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-purple-600 font-medium hover:underline">
                Signup
              </Link>
            </p>
          </form>
        </div>


        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-8 relative">
          <div className="absolute inset-0 bg-[url('/src/assets/images/login.png')] mt-10 mb-30 bg-contain bg-no-repeat bg-center opacity-90 rounded-3xl"></div>
          <blockquote className="relative z-10 text-white text-xl font-semibold text-center px-4 mt-auto mb-8">
            “Imagination is more important than knowledge”
            <br />
            <span className="text-sm font-normal">– Albert Einstein</span>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;
