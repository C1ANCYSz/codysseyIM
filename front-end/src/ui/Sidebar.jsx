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

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 block md:hidden"
      >
        <FiMenu className="text-3xl text-white drop-shadow-md" />
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-[260px] flex-col justify-between rounded-r-2xl bg-[#0e0f11] p-6 text-white shadow-lg backdrop-blur-lg transition-transform duration-300 ease-in-out md:w-[300px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
        {/* Header */}
        <div className="space-y-6">
          <h2 className="text-center text-2xl font-extrabold tracking-wider text-gray-300 uppercase md:text-3xl">
            Codyssey
          </h2>
          <div className="flex items-center gap-3">
            <FiUser className="text-4xl text-white" />
            <div>
              <p className="text-sm md:text-base">Welcome back,</p>
              <p className="text-primary-500 font-bold md:text-lg">MuDai</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
              { to: "/roadmaps", icon: <FiBookOpen />, label: "Roadmaps" },
              {
                to: "/certificates",
                icon: <TbFileCertificate />,
                label: "Certificates",
              },
              {
                to: "/appointments",
                icon: <FaCalendar />,
                label: "Book an Exam",
              },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `hover:bg-primary-800/20 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive ? "bg-primary-800/30" : ""
                    }`
                  }
                >
                  <span className="text-primary-500 text-2xl">{item.icon}</span>
                  <span className="text-base font-medium capitalize">
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}

        <div className="mt-auto border-t border-white/10 pt-6">
          <div className="flex items-center justify-between gap-2">
            {" "}
            <button
              onClick={logout}
              className="flex w-full flex-col items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-white shadow-md transition hover:bg-red-500 hover:shadow-lg"
            >
              <FiLogOut className="mb-1 -scale-x-100 text-3xl" />

              <span className="text-sm font-medium tracking-wide">Logout</span>
            </button>
            <button className="bg-primary-700 hover:bg-primary-600 flex w-full flex-col items-center justify-center rounded-xl px-4 py-3 text-white shadow-md transition hover:shadow-lg">
              <FiSettings className="mb-1 text-3xl" />
              <span className="text-sm font-medium tracking-wide">
                Settings
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
