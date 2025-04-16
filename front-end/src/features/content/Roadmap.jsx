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
    studentData,
    isLoading: userLoading,
    error: userError,
  } = useGetStudent();

  const isEnrolled = studentData?.roadmaps.some(
    (currentRoadmap) => currentRoadmap.roadmap._id === roadmap?._id,
  );

  const completedStages = studentData?.roadmaps.find(
    (currentRoadmap) => currentRoadmap.roadmap._id === roadmap?._id,
  )?.completedStages;

  const currentStage = roadmap?.stages.find(
    (currentStage) => currentStage.number === completedStages + 1,
  );
  console.log("currentStage", currentStage);
  console.log("completedStages", completedStages);
  console.log("studentData", studentData);
  console.log("roadmap", roadmap);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center gap-6 border-b border-white pb-4 md:flex-row">
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
        {!studentData?.roadmaps.some(
          (currentRoadmap) => currentRoadmap.roadmap._id === roadmap._id,
        ) ? (
          <button
            className="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
            onClick={() => enroll(roadmap._id)}
            disabled={enrollLoading}
          >
            {enrollLoading ? "Enrolling..." : "Enroll"}
          </button>
        ) : studentData?.roadmaps.some(
            (currentRoadmap) =>
              currentRoadmap.roadmap._id === roadmap._id &&
              currentRoadmap.completed,
          ) ? (
          <button className="flex cursor-pointer items-center gap-2 rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700">
            <FaCertificate className="text-lg" />
            Get Your Certificate
          </button>
        ) : (
          <button className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all">
            <FaPlay className="text-sm" />
            Continue Learning
          </button>
        )}
      </div>
      <div className="bg-footer-900/70 mb-8 flex flex-col gap-4 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white">Roadmap Progress</h2>
        <div className="bg-footer-700 relative h-4 w-full rounded-full">
          <div
            className={`bg-primary-600 h-4 rounded-full ${
              completedStages === roadmap.stagesCount
                ? "w-full"
                : completedStages === 0
                  ? "w-0"
                  : `w-[${(completedStages / roadmap.stagesCount) * 100}%]`
            }`}
          ></div>
        </div>
      </div>

      {/* Stages Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {roadmap.stages.map((stage) => (
          <div
            key={stage._id}
            className={`group relative overflow-hidden rounded-xl p-4 transition-all ${currentStage.number === stage.number ? "bg-footer-900/70" : "bg-footer-700/70"}`}
          >
            <div className="flex items-center justify-between">
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
            <div
              className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 ${
                isEnrolled ? "bg-primary-600/60" : "bg-gray-900/60"
              }`}
            >
              <button className="bg-primary-600 hover:bg-primary-700 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all">
                {stage.title.includes("Quiz") && isEnrolled
                  ? "Start Quiz"
                  : currentStage.number > 1
                    ? "Continue Learning"
                    : "Start Learning"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roadmap;
