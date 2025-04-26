import { useState } from "react";
import Loader from "../../ui/Loader";
import { motion, AnimatePresence } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useGetCompletedAppointment } from "../../hooks/user/academy/useGetCompletedAppointment";

const PendingAppointments = () => {
  const { completedAppointments, isLoading } = useGetCompletedAppointment();
  console.log(completedAppointments);
  const { appointments, locations } = completedAppointments || {};
  const [selectedLocation, setSelectedLocation] = useState("all");
  const filteredAppointments =
    selectedLocation === "all"
      ? appointments
      : appointments?.filter(
          (appointment) => appointment.location === selectedLocation,
        );

  const handleLocationClick = (location) => setSelectedLocation(location);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-dvh p-8">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-32 cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-white backdrop-blur-lg transition-all hover:bg-white/10"
          onClick={() => handleLocationClick("all")}
        >
          All
        </motion.button>
        {locations?.map((location, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-32 cursor-pointer rounded-full border border-white/10 px-4 py-2 text-center text-white backdrop-blur-lg transition-all ${
              selectedLocation === location
                ? "bg-white/20"
                : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={() => handleLocationClick(location)}
          >
            {location}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredAppointments?.map((appointment) => (
              <motion.div
                key={appointment._id}
                className="group shadow-primary-500 h-fit rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xs backdrop-blur-lg transition-all hover:border-white/20 hover:bg-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between">
                  <div className="mb-6 flex items-center gap-4">
                    <img
                      src={appointment.roadmap.image}
                      alt={appointment.roadmap.title}
                      className="h-20 w-20 rounded-xl object-cover shadow-lg transition-transform group-hover:scale-105"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {appointment.roadmap.title}
                      </h3>
                      <p className="text-sm font-medium text-white/70">
                        {appointment.location}
                      </p>
                    </div>
                  </div>
                  <span className="self-start rounded-full bg-emerald-700 px-3 py-1 text-white uppercase select-none">
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-white/50">Student:</span>
                    <span className="font-medium text-white">
                      {appointment.user.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/50">Email:</span>
                    <span className="font-medium text-white">
                      {appointment.user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/50">Exam Date:</span>
                    <span className="font-medium text-white">
                      {new Date(appointment.examDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/50">Score:</span>
                    <span className="font-medium text-white">
                      {appointment.score}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      {appointments?.length === 0 && (
        <div className="mt-8 flex min-h-[calc(100dvh-20rem)] items-center justify-center text-center text-5xl text-white/70 capitalize">
          No Completed appointments yet
        </div>
      )}
    </div>
  );
};

export default PendingAppointments;
