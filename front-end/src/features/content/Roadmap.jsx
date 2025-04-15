import { useGetRoadmap } from "../../hooks/courses/useGetRoadmap";
import {
  FaPlay,
  FaQuestionCircle,
  FaCertificate,
  FaRocket,
} from "react-icons/fa";
import { useEnroll } from "../../hooks/user/enroll";
import { useGetStudent } from "../../hooks/user/useGetStudent";
function Roadmap() {
  const { roadmap, isLoading, error } = useGetRoadmap();

  const { enroll, isLoading: enrollLoading, error: enrollError } = useEnroll();
  const {
    userData,
    isLoading: userLoading,
    error: userError,
  } = useGetStudent();
  console.log(userData);

  console.log(roadmap);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
        <img
          src={roadmap.image}
          alt={roadmap.title}
          className="h-32 w-32 object-contain"
        />
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white">{roadmap.title}</h1>
          <p className="text-lg text-gray-300">{roadmap.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-blue-500/20 px-4 py-1 text-sm text-blue-300">
              {roadmap.category}
            </span>
            <span className="text-gray-400">{roadmap.stagesCount} Stages</span>
          </div>
        </div>

        {!userData?.roadmaps.some(
          (currentRoadmap) => currentRoadmap.roadmap._id === roadmap._id,
        ) ? (
          <button
            className="bg-primary-600 hover:bg-primary-700 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
            onClick={() => enroll(roadmap._id)}
            disabled={enrollLoading}
          >
            {enrollLoading ? "Enrolling..." : "Enroll"}
          </button>
        ) : userData?.roadmaps.some(
            (currentRoadmap) =>
              currentRoadmap.roadmap._id === roadmap._id &&
              currentRoadmap.completed,
          ) ? (
          <button className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700">
            <FaCertificate className="text-lg" />
            Get Your Certificate
          </button>
        ) : (
          <button className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all">
            <FaPlay className="text-sm" />
            Continue Learning
          </button>
        )}
      </div>

      {/* Stages Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roadmap.stages.map((stage) => (
          <div
            key={stage._id}
            className="group relative overflow-hidden rounded-xl bg-white/10 p-4 transition-all hover:bg-white/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="bg-primary-600/20 text-primary-400 mb-2 inline-block rounded-full px-3 py-1 text-sm">
                  Stage {stage.number}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {stage.title}
                </h3>
                <p className="text-sm text-gray-300">{stage.description}</p>
              </div>
              <div className="ml-4">
                {stage.title.includes("Quiz") ? (
                  <FaQuestionCircle className="text-2xl text-yellow-500" />
                ) : (
                  <FaPlay className="text-primary-500 text-2xl" />
                )}
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="bg-primary-600 hover:bg-primary-700 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all">
                {stage.title.includes("Quiz") ? "Start Quiz" : "Start Learning"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roadmap;
