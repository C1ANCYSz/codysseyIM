import { useGetRoadmap } from "../../hooks/courses/useGetRoadmap";
import {
  FaPlay,
  FaQuestionCircle,
  FaCertificate,
  FaRocket,
  FaCheck,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useEnroll } from "../../hooks/user/enroll";
import { useGetStudent } from "../../hooks/user/useGetStudent";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../ui/Loader";
import { useAddStage } from "../../hooks/user/content-manager/useAddStage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDeleteStage } from "../../hooks/user/content-manager/useDeleteStage";
import { useDeleteRoadmap } from "../../hooks/user/content-manager/useDeleteRoadmap";
function Roadmap() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [stageToDelete, setStageToDelete] = useState(null);
  const [openDeleteRoadmapModal, setOpenDeleteRoadmapModal] = useState(false);
  const [roadmapToDelete, setRoadmapToDelete] = useState(null);
  const { roadmap, isLoading, error } = useGetRoadmap();
  console.log(roadmap);
  const { isLoggedIn, user } = useAuth();

  console.log(user);
  const { role } = user || {};
  const { enroll, isLoading: enrollLoading, error: enrollError } = useEnroll();
  const { register, handleSubmit } = useForm();
  const {
    studentData,
    isLoading: userLoading,
    error: userError,
  } = useGetStudent();
  const {
    addStage,
    isLoading: addStageLoading,
    error: addStageError,
  } = useAddStage();
  const { deleteStage, isLoading: deleteStageLoading } = useDeleteStage();
  const { deleteRoadmap, isLoading: deleteRoadmapLoading } = useDeleteRoadmap();
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

  function onSubmit(data) {
    const stageData = {
      title: data.title,
      description: data.description,
      type: data.type,
      number: roadmap.stagesCount + 1,
    };
    data.type === "quiz" && (stageData.questions = []);
    data.type === "content" && (stageData.videos = []);
    console.log(stageData);
    addStage(stageData, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  }
  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-footer-800 font-body flex min-h-screen">
      {openDeleteRoadmapModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <motion.div
            initial={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -100 }}
            className="bg-footer-900 z-50 w-full max-w-md space-y-4 rounded-lg p-8 text-white shadow-lg"
          >
            <h2 className="mb-4 text-center text-2xl font-bold">
              Are you sure you want to delete this roadmap?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
                onClick={() => {
                  deleteRoadmap();
                  setOpenDeleteRoadmapModal(false);
                }}
                disabled={deleteRoadmapLoading}
              >
                {deleteRoadmapLoading ? "Deleting..." : "Yes"}
              </button>
              <button
                className="bg-primary-600 hover:bg-primary-700 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
                onClick={() => setOpenDeleteRoadmapModal(false)}
                disabled={deleteRoadmapLoading}
              >
                {deleteRoadmapLoading ? "Cancelling..." : "No"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      {openDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <motion.div
            initial={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -100 }}
            className="bg-footer-900 z-50 w-full max-w-md space-y-4 rounded-lg p-8 text-white shadow-lg"
          >
            <h2 className="mb-4 text-center text-2xl font-bold">
              Are you sure you want to delete this stage?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
                onClick={() => {
                  deleteStage(stageToDelete);
                  setOpenDeleteModal(false);
                }}
                disabled={deleteStageLoading}
              >
                {deleteStageLoading ? "Deleting..." : "Yes"}
              </button>
              <button
                className="bg-primary-600 hover:bg-primary-700 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
                onClick={() => setOpenDeleteModal(false)}
                disabled={deleteStageLoading}
              >
                {deleteStageLoading ? "Cancelling..." : "No"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-footer-900 z-50 w-full max-w-md space-y-4 rounded-lg p-8 text-white shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold">Add Stage</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Stage title"
                  className="border-primary-600 w-full rounded-md border-2 p-2 outline-none"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  placeholder="Stage description"
                  className="border-primary-600 w-full rounded-md border-2 p-2 outline-none"
                  {...register("description", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <select
                  id="type"
                  className="border-primary-600 bg-footer-900 w-full rounded-md border-2 p-2 outline-none"
                  {...register("type", { required: true })}
                >
                  <option value="content" className="text-white">
                    Content
                  </option>
                  <option value="quiz" className="text-white">
                    Quiz
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 w-full cursor-pointer rounded-md px-4 py-2 text-white transition-all duration-300"
              >
                Add Stage
              </button>
            </form>
          </div>
        </div>
      )}
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
          {role === "student" ? (
            !isEnrolled ? (
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
              <button
                className="flex cursor-pointer items-center gap-2 rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700"
                onClick={() => {
                  navigate(`/certificates`);
                }}
              >
                <FaCertificate className="text-lg" />
                Get Your Certificate
              </button>
            ) : (
              <Link
                to={`/roadmaps/${roadmap._id}/stage/${currentStage?.number}`}
                className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
              >
                <FaPlay className="text-sm" />
                {currentStage?.number > 1
                  ? "Continue Learning"
                  : "Start Learning"}
              </Link>
            )
          ) : (
            <div className="flex gap-2">
              <button
                className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
                onClick={() => setOpenModal(true)}
              >
                <FaPlus className="text-sm" />
                Add Stage
              </button>
              <button
                className="flex cursor-pointer items-center gap-2 rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
                onClick={() => setOpenDeleteRoadmapModal(true)}
              >
                <FaTrash className="text-sm" />
                Delete Roadmap
              </button>
            </div>
          )}
        </div>

        {/* Roadmap Progress */}
        {isLoggedIn && isEnrolled && (
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
                className={`absolute inset-0 flex items-center justify-center gap-2 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 ${
                  currentStage?.number === stage.number ||
                  (role === "content manager" && "bg-primary-600/60")
                }`}
              >
                {currentStage?.number >= stage.number ||
                (completedStages >= stage.number && role === "student") ? (
                  <button
                    className="bg-footer-800/70 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-black"
                    onClick={() => {
                      navigate(
                        `/roadmaps/${roadmap._id}/stage/${stage.number}`,
                      );
                    }}
                  >
                    {completedStages >= stage.number
                      ? stage.type === "quiz"
                        ? "Review Quiz"
                        : "Review Content"
                      : stage.type === "quiz"
                        ? "Start Quiz"
                        : stage.number === 1
                          ? "Start Learning"
                          : "Continue Learning"}
                  </button>
                ) : (
                  role === "content manager" && (
                    <button
                      className="bg-footer-800/70 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-black"
                      onClick={() => {
                        navigate(
                          `/roadmaps/${roadmap._id}/stage/${stage.number}`,
                        );
                      }}
                    >
                      Edit Stage
                    </button>
                  )
                )}
                {role === "content manager" && (
                  <button
                    className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
                    onClick={() => {
                      setStageToDelete(stage._id);
                      setOpenDeleteModal(true);
                    }}
                  >
                    Delete Stage
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
