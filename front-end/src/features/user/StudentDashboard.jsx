import { useGetStudent } from "../../hooks/user/useGetStudent";
import Sidebar from "../../ui/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";

function StudentDashboard() {
  const {
    studentData: { name, roadmaps },
  } = useGetStudent();
  const [filter, setFilter] = useState("all");

  const filteredRoadmaps =
    filter === "all"
      ? roadmaps
      : filter === "completed"
        ? roadmaps.filter((roadmap) => roadmap.completed)
        : roadmaps.filter(
            (roadmap) =>
              roadmap.completedStages !== roadmap.roadmap.stagesCount,
          );

  return (
    <div className="from-footer-900 to-footer-800 min-h-screen bg-gradient-to-br">
      <div className="flex h-screen">
        <Sidebar name={name} />
        <div className="flex-1 p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-white">
              Your Learning Journey
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {["all", "completed", "incomplete"].map((filterType) => (
                <button
                  key={filterType}
                  className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    filter === filterType
                      ? "bg-primary-600 shadow-primary-600/50 text-white shadow-lg"
                      : "bg-footer-800 text-footer-300 hover:bg-footer-700"
                  }`}
                  onClick={() => setFilter(filterType)}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="[&::-webkit-scrollbar-thumb]:bg-primary-600 bg-footer-800/50 [&::-webkit-scrollbar-track]:bg-footer-700 h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRoadmaps.map((roadmap) => (
                <Link
                  to={`/roadmaps/${roadmap.roadmap._id}`}
                  key={roadmap._id}
                  className="group hover:shadow-primary-600/20 bg-footer-800 relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="bg-footer-900/90 absolute inset-0" />
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="aspect-square h-20 w-20 overflow-hidden rounded-lg">
                        <img
                          src={roadmap.roadmap.image}
                          alt={roadmap.roadmap.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        {roadmap.roadmap.title}
                      </h4>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="bg-footer-700 h-2 flex-1 overflow-hidden rounded-full">
                        <div
                          className="bg-primary-600 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(roadmap.completedStages / roadmap.roadmap.stagesCount) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-primary-400 font-medium">
                        {roadmap.completedStages === roadmap.roadmap.stagesCount
                          ? "Completed"
                          : `${roadmap.completedStages}/${roadmap.roadmap.stagesCount}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
