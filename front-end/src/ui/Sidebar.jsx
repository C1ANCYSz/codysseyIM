import { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaRegCheckCircle,
  FaUsers,
  FaUserSecret,
} from "react-icons/fa";
import {
  FiBookOpen,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUser,
  FiMenu,
  FiBell,
} from "react-icons/fi";
import { TbFileCertificate } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../hooks/auth/useLogout";
import { useUiContext } from "../context/UiContext";
import { useGetNotification } from "../hooks/user/useGetNotification";
import { useEditNotification } from "../hooks/user/admin/useEditNotification";
import { useForm } from "react-hook-form";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { GrScheduleNew } from "react-icons/gr";
import { MdOutlineRecommend } from "react-icons/md";
const navItemsStudent = [
  {
    to: "/dashboard",
    icon: <FiHome className="text-xl" />,
    label: "Dashboard",
  },
  {
    to: "/roadmaps",
    icon: <FiBookOpen className="text-xl" />,
    label: "Roadmaps",
  },
  {
    to: "/certificates",
    icon: <TbFileCertificate className="text-xl" />,
    label: "Certificates",
  },
  {
    to: "/appointments",
    icon: <GrScheduleNew className="text-xl" />,
    label: "Appointments",
  },
  {
    to: "/recommendations",
    icon: <MdOutlineRecommend className="text-xl" />,
    label: "Recommendations",
  },
];

const navItemsContentManager = [
  {
    to: "/roadmaps",
    icon: <FiBookOpen className="text-xl" />,
    label: "Roadmaps",
  },
  {
    to: "/add-roadmap",
    icon: <FiBookOpen className="text-xl" />,
    label: "Add Roadmap",
  },
];

const navItemsAdmin = [
  {
    to: "/dashboard",
    icon: <FiHome className="text-xl" />,
    label: "Dashboard",
  },
  {
    to: "/admin/content-managers",
    icon: <FaUsers className="text-xl" />,
    label: "Content Managers",
  },
  {
    to: "/admin/academies",
    icon: <FaUsers className="text-xl" />,
    label: "Academies",
  },
  {
    label: "Notifications",
    icon: <FiBell className="text-xl" />,
    button: true,
  },
];

const navItemsAcademy = [
  {
    to: "/dashboard",
    icon: <FiHome className="text-xl" />,
    label: "Dashboard",
  },
  {
    to: "/academy/pending-appointments",
    icon: <RiCalendarScheduleLine className="text-xl" />,
    label: "Pending Appointments",
  },
  {
    to: "/academy/accepted-appointments",
    icon: <AiOutlineSchedule className="text-xl" />,
    label: "Accepted Appointments",
  },
  {
    to: "/academy/completed-appointments",
    icon: <FaRegCheckCircle className="text-xl text-green-500" />,
    label: "Completed Appointments",
  },
];

const navItems = {
  student: navItemsStudent,
  "content manager": navItemsContentManager,
  admin: navItemsAdmin,
  academy: navItemsAcademy,
};

function Sidebar({ user }) {
  const { register, handleSubmit } = useForm();
  const { name, role } = user || {};
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const { openModal, setOpenModal } = useUiContext();
  const { notification } = useGetNotification();
  const { editNotification } = useEditNotification();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  function editNotificationHandler(data) {
    editNotification(data, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpenModal(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" && openModal) {
        setOpenModal(false);
      }
    }
    modalRef.current?.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      modalRef.current?.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  return (
    <>
      {/* Notification Modal */}
      {openModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-300"
        >
          <div
            ref={containerRef}
            className="w-full max-w-md transform rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-2xl ring-1 ring-white/20 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(editNotificationHandler)}
            >
              <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-center text-2xl font-bold text-transparent">
                Notification
              </h2>
              <div className="relative flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur-lg transition-all duration-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="flex-1 bg-transparent text-lg outline-none"
                  defaultValue={notification?.text}
                  {...register("text")}
                />
                <button className="cursor-pointer transition-transform hover:scale-110">
                  <FaCheckCircle className="text-2xl text-green-500" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 rounded-full bg-gray-900/80 p-3 backdrop-blur-md transition-all duration-300 hover:bg-gray-800 md:hidden"
      >
        <FiMenu className="text-2xl text-white" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-[280px] flex-col justify-between bg-gradient-to-b from-gray-900 to-gray-950 p-6 text-white shadow-2xl transition-transform duration-500 ease-in-out md:w-[300px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
        {/* Header */}
        <div className="space-y-8">
          <div className="flex items-center justify-center">
            <h2 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
              CODYSSEY
            </h2>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-gray-800/50 p-4 backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              {role === "admin" ? (
                <FaUserSecret className="text-xl" />
              ) : (
                <FiUser className="text-xl" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400">Welcome back</p>
              <p className="font-bold text-white">{name || "MuDai"}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 mt-8 flex-1 overflow-y-auto py-4">
          <ul className="space-y-2">
            {navItems[role]?.map((item, index) => (
              <li key={index}>
                {item.button ? (
                  <button
                    className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 text-left font-medium text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-orange-500 hover:shadow-lg"
                    onClick={handleOpenModal}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 font-medium text-white"
                          : "text-gray-300 hover:bg-gray-800/50"
                      }`
                    }
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto border-t border-white/10 pt-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={logout}
              className="group flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-500 px-3 py-3 text-white shadow-md transition-all duration-300 hover:from-red-500 hover:to-red-800 hover:shadow-lg"
            >
              <FiLogOut className="mb-1 -scale-x-100 text-2xl transition-transform group-hover:scale-110" />
              <span className="text-xs font-medium">Logout</span>
            </button>

            <Link
              to="/settings"
              className="group from-primary-600 hover:to-primary-400 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br to-blue-500 px-3 py-3 text-white shadow-md transition-all duration-300 hover:from-blue-500 hover:shadow-lg"
            >
              <FiSettings className="mb-1 text-2xl transition-transform group-hover:rotate-45" />
              <span className="text-xs font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
