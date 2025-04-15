import { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import {
  FiBookOpen,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { TbFileCertificate } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

function Sidebar() {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 block md:hidden"
      >
        <FiMenu className="text-3xl text-white" />
      </button>

      <aside
        className={`bg-footer-900/70 fixed top-0 left-0 z-40 flex h-full flex-col justify-between space-y-8 rounded-r-xl px-4 py-5 transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} w-[280px] md:static md:w-[320px] md:translate-x-0 lg:w-[350px]`}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-xl font-bold text-white md:text-2xl">
            Codyssey
          </h2>
          <div className="flex items-center gap-2">
            <FiUser className="text-4xl text-white md:text-5xl" />
            <p className="text-lg text-white md:text-xl">
              Welcome back{" "}
              <span className="text-primary-600 font-bold">MuDai</span>
            </p>
          </div>
        </div>
        <nav>
          <ul className="flex flex-col space-y-6 md:space-y-8">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 md:gap-4 md:px-4 md:py-2.5 ${isActive && "rounded-full bg-black"}`
                }
              >
                <FiHome className="text-primary-600 text-2xl md:text-3xl" />
                <p className="text-sm text-white md:text-base">Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/roadmaps"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 md:gap-4 md:px-4 md:py-2.5 ${isActive && "rounded-full bg-black"}`
                }
              >
                <FiBookOpen className="text-primary-600 text-2xl md:text-3xl" />
                <p className="text-sm text-white md:text-base">Roadmaps</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/certificates"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 md:gap-4 md:px-4 md:py-2.5 ${isActive && "rounded-full bg-black"}`
                }
              >
                <TbFileCertificate className="text-primary-600 text-2xl md:text-3xl" />
                <p className="text-sm text-white md:text-base">Certificates</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/certificates"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 md:gap-4 md:px-4 md:py-2.5 ${isActive && "rounded-full bg-black"}`
                }
              >
                <FaCalendar className="text-primary-600 text-2xl md:text-3xl" />
                <p className="text-sm text-white capitalize md:text-base">
                  book an apointement
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 md:gap-4">
          <button className="bg-primary-700 flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-1.5 text-sm text-white md:px-4 md:py-2 md:text-base">
            <FiSettings className="text-white" />
            Settings
          </button>
          <button
            onClick={logout}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-sm text-white md:px-4 md:py-2 md:text-base"
          >
            <FiLogOut className="text-white" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
