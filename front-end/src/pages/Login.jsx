import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Access global auth state

  const { login, isLoading, error } = useLogin();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  function onSubmit(data) {
    login(data);
  }

  return (
    <div className="via-primary-600 flex h-dvh w-screen items-center justify-center bg-gradient-to-br from-blue-950 to-blue-950 px-2 lg:h-[calc(100dvh-80px)]">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="w-full p-8 sm:p-12 md:w-1/2">
          <h1 className="text-primary-600 mb-2 text-5xl font-extrabold">
            HELLO!
          </h1>
          <p className="mb-8 text-gray-700">Welcome back to our community</p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="focus:border-primary-600 w-full rounded-md border-2 border-black px-4 py-3 text-lg focus:outline-none"
                {...register("email", { required: true })}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="focus:border-primary-600 w-full rounded-md border-2 border-black px-4 py-3 pr-12 text-lg focus:outline-none"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                className="absolute top-4 right-4 text-xl text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary-600" />
                Remember
              </label>
              <Link
                to="/forgot-password"
                className="text-primary-600 font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-black py-3 text-lg font-bold text-white transition-transform duration-300 hover:scale-105"
            >
              LOGIN
            </button>

            <p className="mt-4 text-center text-sm text-gray-700">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary-600 font-medium hover:underline"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>

        <div className="from-primary-500 relative hidden w-1/2 items-center justify-center bg-gradient-to-br to-indigo-600 p-8 md:flex">
          <div className="absolute inset-0 mt-10 mb-30 rounded-3xl bg-[url('/src/assets/images/login.png')] bg-contain bg-center bg-no-repeat opacity-90"></div>
          <blockquote className="relative z-10 mt-auto mb-8 px-4 text-center text-xl font-semibold text-white">
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
