import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function StudentDashboard({ name, roadmaps }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="containertwo mx-auto px-4 py-8">
        <div className="flex items-center gap-4">
          <h2 className="to-primary-600 rounded-full bg-gradient-to-r from-blue-500/60 px-4 py-2 text-2xl font-bold text-white">
            Welcome back, {name}.
          </h2>
          <button className="cursor-pointer rounded-full bg-white/70 p-0.5">
            <IoIosSettings className="text-3xl" />
          </button>
        </div>
        <div className="mt-6 grid min-h-[calc(100vh-12rem)] grid-cols-[2fr_1fr] grid-rows-3 gap-4">
          <div className="row-span-3 flex flex-col gap-4 rounded-lg bg-white/70 p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white">Your Roadmaps</h3>
              <div className="flex items-center gap-2">
                <button className="bg-primary-600 cursor-pointer rounded-full border-2 border-white px-6 py-2 text-white">
                  All
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              {roadmaps.map((roadmap) => (
                <div
                  key={roadmap._id}
                  className="flex flex-col items-center gap-4"
                >
                  <h4 className="text-primary-600 text-lg font-bold">
                    {roadmap.roadmap.title}
                  </h4>
                  <img
                    src={roadmap.roadmap.image}
                    alt={roadmap.roadmap.title}
                  />
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
        <button
          className="bg-primary-600 cursor-pointer rounded-full border-2 border-white px-6 py-2 text-white"
          onClick={() => navigate("/certificates")}
        >
          certicates
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
