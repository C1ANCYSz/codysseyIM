import { useGetRoadmap } from "../../hooks/courses/useGetRoadmap";
import {
  FaPlay,
  FaQuestionCircle,
  FaCertificate,
  FaRocket,
  FaCheck,
} from "react-icons/fa";
import { useEnroll } from "../../hooks/user/enroll";
import { useGetStudent } from "../../hooks/user/useGetStudent";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Roadmap() {
  const { roadmap, isLoading, error } = useGetRoadmap();
  const { isLoggedIn } = useAuth();
  const { enroll, isLoading: enrollLoading, error: enrollError } = useEnroll();
  const navigate = useNavigate();
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

  let currentStage;

  if (
    roadmap &&
    roadmap.stages &&
    typeof completedStages === "number" &&
    typeof roadmap.stagesCount === "number"
  ) {
    if (completedStages === roadmap.stagesCount) {
      currentStage = roadmap.stagesCount;
    } else {
      currentStage =
        roadmap.stages.find((stage) => stage.number === completedStages + 1) ??
        completedStages + 1;
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-footer-800 font-body flex">
      <div className="container mx-auto my-10">
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
              <span className="text-gray-400">
                {roadmap.stagesCount} Stages
              </span>
            </div>
          </div>
          {!isEnrolled ? (
            <button
              className="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
              onClick={() => {
                if (isLoggedIn) {
                  enroll(roadmap._id);
                } else {
                  navigate("/login");
                }
              }}
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
            <Link
              to={`/roadmaps/${roadmap._id}/stage/${currentStage.number}`}
              className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
            >
              <FaPlay className="text-sm" />
              {currentStage.number > 1 ? "Continue Learning" : "Start Learning"}
            </Link>
          )}
        </div>

        {/* Roadmap Progress */}
        {isLoggedIn && (
          <div className="bg-footer-900/70 mb-8 flex flex-col gap-4 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white">Roadmap Progress</h2>
            <div className="bg-footer-700 relative h-4 w-full rounded-full">
              <div
                className="bg-primary-600 h-4 rounded-full transition-all duration-300"
                style={{
                  width:
                    completedStages === roadmap.stagesCount
                      ? "100%"
                      : completedStages === 0
                        ? "0%"
                        : `${(completedStages / roadmap.stagesCount) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Stages Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {roadmap.stages.map((stage) => (
            <div
              key={stage._id}
              className={`group relative overflow-visible rounded-xl transition-all ${
                completedStages >= stage.number
                  ? "bg-purple-700/70"
                  : currentStage?.number === stage.number
                    ? "bg-footer-900/70 border-4 border-purple-600"
                    : "bg-footer-700/70"
              }`}
            >
              {/* ✅ Checkmark */}
              {completedStages >= stage.number && (
                <div className="absolute -top-2 -right-2 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white shadow-md">
                  <FaCheck />
                </div>
              )}

              {/* Padding wraps only actual content */}
              <div className="p-4">
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
                    {stage.type === "quiz" ? (
                      <div className="flex items-center gap-2">
                        {stage.score !== undefined ? (
                          <span className="text-sm font-semibold text-gray-300">
                            {stage.score}/{stage.questionsCount}
                          </span>
                        ) : null}
                        <FaQuestionCircle className="text-2xl text-yellow-500" />
                      </div>
                    ) : (
                      <FaPlay className="text-primary-500 text-2xl" />
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div
                className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 ${
                  currentStage?.number === stage.number && "bg-primary-600/60"
                }`}
              >
                {currentStage?.number === stage.number && (
                  <button
                    className="bg-primary-600 hover:bg-primary-700 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
                    onClick={() => {
                      navigate(
                        `/roadmaps/${roadmap._id}/stage/${stage.number}`,
                      );
                    }}
                  >
                    {stage.type === "quiz" && isEnrolled
                      ? "Start Quiz"
                      : currentStage?.number > 1
                        ? "Continue Learning"
                        : "Start Learning"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
