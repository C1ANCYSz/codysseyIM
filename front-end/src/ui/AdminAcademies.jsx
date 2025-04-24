import { useGetContentManagers } from "../hooks/user/admin/useGetContentManagers";
import Loader from "./Loader";
import { PiPlus } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { TbForbidFilled } from "react-icons/tb";
import { useToggleRevoke } from "../hooks/user/admin/useToggleRevoke";
import { toast } from "react-hot-toast";
import { useAddAcademy } from "../hooks/user/admin/useAddAcademies";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useGetAcademies } from "../hooks/user/admin/useGetAcademies";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { useGetNotification } from "../hooks/user/useGetNotification";
import { useEditNotification } from "../hooks/user/admin/useEditNotification";

function AdminAcademies() {
  const [addAcademyModal, setAddAcademyModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { academiesData: { academies } = {}, isLoading } = useGetAcademies();

  const { toggleRevoke, isLoading: isRevoking } = useToggleRevoke();
  const { addAcademy, isLoading: isAdding } = useAddAcademy();
  const modalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(
    function () {
      function handleClickOutside(event) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setAddAcademyModal(false);
        }
      }
      modalRef.current?.addEventListener("click", handleClickOutside);
      return () => {
        modalRef.current?.removeEventListener("click", handleClickOutside);
      };
    },
    [modalRef.current, containerRef.current],
  );

  function addAcademyHandler(data) {
    console.log(data);
    addAcademy(
      { email: data.email },
      {
        onSuccess: () => {
          setAddAcademyModal(false);
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  if (isLoading) return <Loader />;

  return (
    <div className="from-primary-900 min-h-screen bg-gradient-to-br to-black p-8">
      {addAcademyModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300"
        >
          <div
            ref={containerRef}
            className="w-full max-w-md transform rounded-2xl bg-white/10 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:ring-white/20"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-2xl font-bold text-transparent">
                Add Academy
              </h2>
              <button
                onClick={() => setAddAcademyModal(false)}
                className="rounded-full bg-white/5 p-2 transition-all duration-300 hover:bg-white/10"
              >
                <IoMdClose className="text-2xl text-white/80" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(addAcademyHandler)}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email", { required: true })}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-center text-white placeholder-white/50 transition-all duration-300 outline-none focus:border-white/20 focus:bg-white/10 focus:ring-2 focus:ring-white/10"
              />
              <button
                type="submit"
                className="bg-primary-600 mx-auto rounded-full p-3 px-4 font-medium text-white transition-all duration-300 focus:ring-2 focus:ring-white/20"
                disabled={isAdding}
              >
                Add Academy
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        <div
          className="group relative flex h-[330px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
          onClick={() => setAddAcademyModal(true)}
        >
          <PiPlus className="text-8xl text-white/80 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90" />
        </div>

        {academies?.map((academy) => (
          <div
            key={academy._id}
            className="relative flex h-[330px] flex-col items-center justify-center rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
          >
            {academy.isRevoked && (
              <div className="absolute top-4 right-4 z-10">
                <TbForbidFilled className="animate-pulse text-3xl text-red-500" />
              </div>
            )}

            <div className="relative mb-4">
              {academy.image ? (
                <img
                  src={academy.image}
                  alt={academy.name}
                  className="h-28 w-28 rounded-full object-cover ring-2 ring-white/20 transition-all duration-300 group-hover:ring-white/40"
                />
              ) : (
                <BiUserCircle className="text-8xl text-white/80" />
              )}
            </div>

            <h2 className="mb-2 text-2xl font-bold text-white/90 select-none">
              {academy.name}
            </h2>
            <p className="text-sm text-white/60 select-none">{academy.email}</p>
            <p className="mb-3 text-sm text-white/60 select-none">
              {academy.phoneNumber || "No Phone Number"}
            </p>
            <div className="group relative">
              <button className="bg-primary-600/90 hover:bg-primary-600 flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-all duration-300 select-none">
                Locations
                <FaMapMarkerAlt className="text-white/80" />
              </button>
              <div className="absolute top-full left-1/2 z-10 mt-2 hidden min-w-[200px] -translate-x-1/2 flex-col gap-2 rounded-xl bg-black/90 p-3 text-sm text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-lg transition-all duration-300 group-hover:flex hover:ring-white/20">
                {academy.locations?.map((location) => (
                  <span
                    key={location}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10"
                  >
                    <FaMapMarkerAlt className="text-primary-400 text-xs" />
                    {location}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() =>
                toggleRevoke(academy.email, {
                  onSuccess: () => {
                    toast.success(
                      `${academy.name} has been ${academy.isRevoked ? "unrevoked" : "revoked"}`,
                    );
                  },
                })
              }
              disabled={isRevoking}
              className={`mt-4 transform cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-all duration-300 ${
                academy.isRevoked
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-red-500 hover:bg-red-600"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {academy.isRevoked ? "Unrevoke Access" : "Revoke Access"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAcademies;
