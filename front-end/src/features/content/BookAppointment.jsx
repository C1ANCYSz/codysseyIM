import { useParams } from "react-router-dom";
import { useGetBookAcademies } from "../../hooks/user/useGetBookAcademies";
import Loader from "../../ui/Loader";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMakeAppointment } from "../../hooks/user/useMakeAppointment";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

function BookAppointment() {
  const { roadmapId } = useParams();
  const { academies, isLoading } = useGetBookAcademies();
  const [academy, setAcademy] = useState(null);
  const { register, handleSubmit } = useForm();
  const { makeAppointment, isLoading: isBooking } = useMakeAppointment();

  useEffect(() => {
    if (academies) {
      setAcademy(academies[0]);
    }
  }, [academies]);

  const onSubmit = (data) => {
    const academyId = academies[Number(data.academy)]._id;
    const location =
      data.location || academies[Number(data.academy)].locations[0];
    makeAppointment({ academyId, location, roadmapId });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white/10 p-8 backdrop-blur-xl"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Schedule Your Appointment
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <FaUniversity className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <select
              id="academy"
              {...register("academy")}
              onChange={(e) => setAcademy(academies[e.target.value])}
              className="focus:ring-primary-500 w-full rounded-lg bg-white/5 py-3 pr-4 pl-10 text-white transition-all outline-none focus:ring-2"
            >
              {academies.map((academy, index) => (
                <option
                  key={academy._id}
                  value={index}
                  className="bg-primary-900/80"
                >
                  {academy.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <FaMapMarkerAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <select
              id="location"
              {...register("location")}
              className="focus:ring-primary-500 w-full rounded-lg bg-white/5 py-3 pr-4 pl-10 text-white transition-all outline-none focus:ring-2"
            >
              {academy?.locations?.map((location, index) => (
                <option
                  key={index}
                  value={location}
                  className="bg-primary-900/80"
                >
                  {location}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isBooking}
            className="bg-primary-500 hover:bg-primary-600 mt-4 rounded-lg px-6 py-3 font-semibold text-white transition-all disabled:opacity-50"
          >
            {isBooking ? "Booking..." : "Book Appointment"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default BookAppointment;
