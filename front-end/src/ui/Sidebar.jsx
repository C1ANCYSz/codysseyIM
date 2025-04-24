import { useEffect, useRef, useState } from "react";
import {
  FaCalendar,
  FaCheckCircle,
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

const navItemsStudent = [
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
    label: "Book an appointment",
  },
];

const navItemsContentManager = [
  { to: "/roadmaps", icon: <FiBookOpen />, label: "Roadmaps" },
  { to: "/add-roadmap", icon: <FiBookOpen />, label: "Add Roadmap" },
];

const navItemsAdmin = [
  { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  {
    to: "/admin/content-managers",
    icon: <FaUsers />,
    label: "Content Managers",
  },
  { to: "/admin/academies", icon: <FaUsers />, label: "Academies" },
  {
    label: "Notifications",
    icon: <FiBell className="text-xl" />,
    button: true,
  },
];

const navItems = {
  student: navItemsStudent,
  "content manager": navItemsContentManager,
  admin: navItemsAdmin,
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
  const { notification, isLoading: isLoadingNotification } =
    useGetNotification();
  const { editNotification, isEditing } = useEditNotification();

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
      {openModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300"
        >
          <div
            ref={containerRef}
            className="w-full max-w-md transform rounded-2xl bg-white/10 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:ring-white/20"
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(editNotificationHandler)}
            >
              <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-center text-2xl font-bold text-transparent">
                Notification
              </h2>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center text-white placeholder-white/50 transition-all duration-300 outline-none focus:border-white/20 focus:bg-white/10 focus:ring-2 focus:ring-white/10">
                <input
                  type="text"
                  placeholder="Message"
                  className="flex-1 outline-none"
                  defaultValue={notification?.text}
                  {...register("text")}
                />
                <button className="cursor-pointer">
                  <FaCheckCircle className="text-2xl text-green-500" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
            {role === "admin" ? (
              <FaUserSecret className="text-4xl text-white" />
            ) : (
              <FiUser className="text-4xl text-white" />
            )}
            <div>
              <p className="text-sm md:text-base">Welcome back,</p>
              <p className="text-primary-500 font-bold uppercase md:text-lg">
                {name || "MuDai"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {navItems[role]?.map((item) => (
              <li key={item.id}>
                {item.button ? (
                  <button
                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-orange-400 px-4 py-3 text-left text-base font-medium capitalize transition-all duration-200 hover:bg-orange-500"
                    onClick={handleOpenModal}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `hover:bg-primary-800/20 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                        isActive ? "bg-primary-800/30" : ""
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                )}
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
            <Link
              to="/settings"
              className="bg-primary-700 hover:bg-primary-600 flex w-full flex-col items-center justify-center rounded-xl px-4 py-3 text-white shadow-md transition hover:shadow-lg"
            >
              <FiSettings className="mb-1 text-3xl" />
              <span className="text-sm font-medium tracking-wide">
                Settings
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
