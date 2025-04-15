import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthProvider";
import { useLogout } from "../hooks/useLogout";

function Header() {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  return (
    <div className="bg-footer-900 border-primary-600 relative border-b-2 py-2 shadow-sm md:py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-1 md:gap-3"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/src/assets/logo.png"
              alt="logo"
              className="group-hover:drop-shadow-primary-600/50 mt-2 h-7 w-7 transition-all duration-300 group-hover:drop-shadow-md md:h-10 md:w-10"
            />
            <h1 className="font-logo group-hover:text-primary-300 text-xl font-bold tracking-wider text-white duration-200 text-shadow-2xs text-shadow-black md:text-3xl">
              Codyssey
            </h1>
          </Link>
          <FiMenu
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary-700 rounded-sm p-1.5 text-3xl text-white md:hidden"
          />
          <div
            className={`bg-footer-800 absolute inset-x-0 top-13 text-center text-white shadow-md transition-transform duration-300 ${
              isOpen ? "z-50 translate-x-0" : "translate-x-full"
            }`}
          >
            <nav role="navigation" aria-label="User menu">
              <ul className="flex flex-col gap-4 py-5">
                <Link
                  to="/login"
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <li>Login</li>
                </Link>
                <Link
                  to="/signup"
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <li>SignUp</li>
                </Link>
              </ul>
            </nav>
          </div>
          {!isLoggedIn ? (
            <div className="hidden items-center gap-4 md:flex">
              <Link to="/login">
                <button className="cursor-pointer rounded-md border bg-white px-6 py-2 font-bold text-black duration-200 hover:bg-gray-200">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-md border-2 border-white px-6 py-2 font-bold text-white duration-200">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <div className="hidden items-center gap-4 md:flex">
              <Link to="/dashboard">
                <button className="cursor-pointer rounded-md border bg-white px-6 py-2 font-bold text-black duration-200 hover:bg-gray-200">
                  Dashboard
                </button>
              </Link>
              <Link to="/roadmaps">
                <button className="cursor-pointer rounded-md border bg-white px-6 py-2 font-bold text-black duration-200 hover:bg-gray-200">
                  Roadmaps
                </button>
              </Link>
              <Link to="/logout" onClick={logout}>
                <button className="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-md border-2 border-white px-6 py-2 font-bold text-white duration-200">
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
