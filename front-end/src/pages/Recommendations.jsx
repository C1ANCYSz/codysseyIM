import { Link } from "react-router-dom";
import { useGetRecommendations } from "../hooks/user/useGetRecommendations";
import Loader from "../ui/Loader";
import { useAuth } from "../context/AuthProvider";
import StudentQuestionaire from "../features/user/StudentQuestionaire";
import { useState } from "react";

function Recommendations() {
  const { recommendations, isLoading } = useGetRecommendations();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  console.log(user);
  console.log(recommendations);
  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen overflow-y-auto p-4">
      {recommendations.length === 0 ? (
        <>
          <div className="flex min-h-screen flex-col items-center justify-center gap-10">
            <h1 className="from-primary-600 bg-gradient-to-r to-cyan-800 bg-clip-text text-5xl font-bold text-transparent">
              No Recommendations Available
            </h1>
            <button
              className="bg-primary-700 hover:bg-primary-800 cursor-pointer rounded-full px-8 py-4 text-white transition-all duration-300"
              onClick={() => setModalOpen(true)}
            >
              Take Questionnaire
            </button>
          </div>
          {modalOpen && <StudentQuestionaire />}
        </>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendations.map((roadmap) => (
            <Link
              to={`/roadmaps/${roadmap._id}`}
              key={roadmap._id}
              className="group hover:shadow-primary-600/20 relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl"
            >
              <div className="from-primary-600/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-40 w-40 overflow-hidden rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={roadmap.image}
                    alt={roadmap.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-6 text-center text-xl font-bold text-white">
                  {roadmap.title}
                </h3>
                <div className="bg-primary-600/20 text-primary-400 mt-4 transform rounded-full px-4 py-1 text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View Roadmap
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
