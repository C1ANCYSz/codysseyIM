import { useState } from "react";
import { useGetPendingAppointment } from "../../hooks/user/academy/useGetPendingAppointment";
import Loader from "../../ui/Loader";
import { useUpdateAppointment } from "../../hooks/user/academy/useUpdateAppointment";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PendingAppointments = () => {
  const { pendingAppointments, isLoading } = useGetPendingAppointment();
  const { appointments, locations } = pendingAppointments || {};

  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    return date;
  });

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const { updateAppointment, isLoading: isUpdating } = useUpdateAppointment();

  const filteredAppointments =
    selectedLocation === "all"
      ? appointments
      : appointments?.filter(
          (appointment) => appointment.location === selectedLocation,
        );

  const handleLocationClick = (location) => setSelectedLocation(location);

  const handleReject = (appointmentId) => {
    updateAppointment({ appointmentId, date: { status: "rejected" } });
  };

  const handleAccept = (appointmentId) => {
    updateAppointment(
      {
        appointmentId,
        data: {
          date: new Date(startDate).toISOString(),
          status: "accepted",
        },
      },
      {
        onSuccess: () => {
          setSelectedAppointment(null);
          setIsOpen(false);
        },
      },
    );
  };

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
                className="group h-fit rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition-all hover:border-white/20 hover:bg-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
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
                </div>

                <AnimatePresence>
                  {selectedAppointment?._id === appointment._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 space-y-2"
                    >
                      <label className="block text-sm font-medium text-white/70">
                        Select Date & Time
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-white"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex items-center justify-center gap-3">
                  {isOpen && selectedAppointment?._id === appointment._id ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 cursor-pointer rounded-full bg-emerald-500 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:bg-emerald-600"
                        onClick={() => handleAccept(appointment._id)}
                      >
                        Confirm
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 cursor-pointer rounded-full bg-rose-500 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:bg-rose-600"
                        onClick={() => {
                          setSelectedAppointment(null);
                          setIsOpen(false);
                        }}
                      >
                        Cancel
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 cursor-pointer rounded-full bg-emerald-500 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:bg-emerald-600"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsOpen(true);
                        }}
                      >
                        Accept
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 cursor-pointer rounded-full bg-rose-500 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:bg-rose-600"
                        onClick={() => handleReject(appointment._id)}
                      >
                        Reject
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      {appointments?.length === 0 && (
        <div className="mt-8 flex min-h-[calc(100dvh-20rem)] items-center justify-center text-center text-5xl text-white/70 capitalize">
          No appointments found
        </div>
      )}
    </div>
  );
};

export default PendingAppointments;
