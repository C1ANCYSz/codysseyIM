import { useState } from "react";
import Loader from "../../ui/Loader";
import { useUpdateAppointment } from "../../hooks/user/academy/useUpdateAppointment";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAcceptedAppointment } from "../../hooks/user/academy/useGetAcceptedAppointment";
import toast from "react-hot-toast";

const PendingAppointments = () => {
  const { acceptedAppointments, isLoading } = useGetAcceptedAppointment();
  const { appointments, locations } = acceptedAppointments || {};
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const { updateAppointment, isLoading: isUpdating } = useUpdateAppointment();
  const { register, handleSubmit, reset } = useForm();
  const filteredAppointments =
    selectedLocation === "all"
      ? appointments
      : appointments?.filter(
          (appointment) => appointment.location === selectedLocation,
        );

  const handleLocationClick = (location) => setSelectedLocation(location);

  const onSubmit = (data) => {
    updateAppointment(
      {
        appointmentId: selectedAppointment._id,
        data: {
          status: "completed",
          score: data.score,
        },
      },
      {
        onSuccess: () => {},
      },
    );
  };

  const onErorr = ({ score }) => {
    console.log(score);
    toast.error(score.message);
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

                <form
                  className="mt-6 flex flex-col gap-3"
                  onSubmit={handleSubmit(onSubmit, onErorr)}
                >
                  <div className="flex items-center gap-2">
                    <label htmlFor="score" className="text-white/50">
                      Score
                    </label>
                    {isOpen && selectedAppointment._id === appointment._id ? (
                      <input
                        type="number"
                        {...register("score", {
                          required: {
                            value: true,
                            message: "Score is Required",
                          },
                          min: {
                            value: 0,
                            message: "Min value for the score is 0",
                          },
                          max: {
                            value: 100,
                            message: "Max value for the score is 100",
                          },
                        })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-center text-white"
                      />
                    ) : (
                      <button
                        type="button"
                        className="cursor-pointer rounded-md bg-green-600 px-3 py-1 text-white"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsOpen(true);
                          reset();
                        }}
                      >
                        Add Score
                      </button>
                    )}
                  </div>
                  {isOpen && selectedAppointment._id === appointment._id && (
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-white/10 px-4 py-2 text-center text-white backdrop-blur-lg transition-all hover:bg-white/20"
                    >
                      Complete
                    </button>
                  )}
                </form>
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
