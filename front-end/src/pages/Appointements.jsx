import { format } from "date-fns";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaTrash,
} from "react-icons/fa";
import Loader from "../ui/Loader";
import { useGetAppointments } from "../hooks/user/useGetAppointments";
import { useDeleteAppointment } from "../hooks/user/useDeleteAppointment";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
function Appointments() {
  const { appointments, isLoading } = useGetAppointments();
  const { deleteAppointment, isLoading: isDeleting } = useDeleteAppointment();
  const getStatusColor = (status) => {
    const colors = {
      accepted: "bg-emerald-500/80",
      pending: "bg-amber-500/80",
      rejected: "bg-rose-500/80",
      completed: "bg-primary-500/80",
    };
    return colors[status] || "bg-gray-500/80";
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent">
        My Appointments
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <button
              onClick={() => deleteAppointment(appointment._id)}
              disabled={isDeleting}
              className="absolute top-2 right-2 animate-pulse cursor-pointer rounded-full text-2xl text-red-500 transition-all duration-1000"
            >
              <MdCancel />
            </button>
            {/* Roadmap Header */}
            <div className="mb-6 flex items-center gap-4">
              <img
                src={appointment.roadmap.image}
                alt={appointment.roadmap.title}
                className="h-20 w-20 rounded-xl object-cover ring-2 ring-white/10 transition-all duration-300 group-hover:ring-white/20"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {appointment.roadmap.title}
                </h3>
                <span
                  className={`mt-2 inline-block rounded-full px-4 py-1 text-sm font-medium text-white backdrop-blur-sm ${getStatusColor(appointment.status)}`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>

            {/* Academy Info */}
            <div className="mb-6 space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Academy</h4>
              <p className="text-lg font-medium text-white">
                {appointment.academy.name}
              </p>
              <p className="text-sm text-gray-400">
                {appointment.academy.email}
              </p>
            </div>

            {/* Location & Date */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-primary-500" />
                <span className="text-sm">{appointment.location}</span>
              </div>

              {appointment.examDate && (
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCalendarAlt className="text-primary-500" />
                  <span className="text-sm">
                    {format(
                      new Date(appointment.examDate),
                      "MMM dd, yyyy - HH:mm",
                    )}
                  </span>
                </div>
              )}

              {appointment.score && (
                <div className="flex items-center gap-3 text-gray-300">
                  <FaTrophy className="text-amber-500" />
                  <span className="text-sm">Score: {appointment.score}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="mt-12 text-center text-lg text-gray-400">
          No appointments found yet
        </div>
      )}
    </div>
  );
}

export default Appointments;
