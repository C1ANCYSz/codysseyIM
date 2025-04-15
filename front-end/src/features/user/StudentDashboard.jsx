import { useGetStudent } from "../../hooks/user/useGetStudent";
import Sidebar from "../../ui/Sidebar";
import { useState } from "react";
function StudentDashboard() {
  const {
    studentData: { name, roadmaps },
  } = useGetStudent();
  const [filter, setFilter] = useState("all");
  console.log(roadmaps);
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
    <div className="min-h-screen">
      <div className="flex h-full">
        <Sidebar name={name} />
        <div className="mx-6 my-4 flex w-full flex-col gap-4 rounded-lg bg-white/70 p-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white">Your Roadmaps</h3>
            <div className="flex items-center gap-2">
              <button
                className="bg-primary-600 cursor-pointer rounded-full border-2 border-white px-6 py-2 text-white"
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className="bg-primary-600 cursor-pointer rounded-full border-2 border-white px-6 py-2 text-white"
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
              <button
                className="bg-primary-600 cursor-pointer rounded-full border-2 border-white px-6 py-2 text-white"
                onClick={() => setFilter("incomplete")}
              >
                Incomplete
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            {filteredRoadmaps.map((roadmap) => (
              <div
                key={roadmap._id}
                className="flex flex-col items-center gap-4"
              >
                <h4 className="text-primary-600 text-lg font-bold">
                  {roadmap.roadmap.title}
                </h4>
                <img src={roadmap.roadmap.image} alt={roadmap.roadmap.title} />
                <p className="text-primary-600 text-2xl">
                  {roadmap.completedStages === roadmap.roadmap.stagesCount
                    ? "Completed"
                    : `${roadmap.completedStages + 1}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
