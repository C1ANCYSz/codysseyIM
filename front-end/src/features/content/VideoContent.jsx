import { useGetStage } from "../../hooks/courses/useGetStage";
import { useGetRoadmap } from "../../hooks/courses/useGetRoadmap";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaPlay,
  FaPlus,
  FaTrash,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import YoutubePlayer from "../../ui/YoutubePlayer";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import { useUiContext } from "../../context/UiContext";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useUpdateStageContent } from "../../hooks/courses/useUpdateStageContent";
import { useAuth } from "../../context/AuthProvider";

function VideoContent() {
  const navigate = useNavigate();
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    url: "",
  });
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [videosArray, setVideosArray] = useState([]);
  const [docsCount, setDocsCount] = useState(0);
  const { stage: { stage } = {}, isLoading, error } = useGetStage();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isNextStageDisabled, setIsNextStageDisabled] = useState(true);
  const { user: { role } = {} } = useAuth();
  console.log(role);
  const {
    docs,
    number,
    title,
    type,
    videos,
    roadmap: roadmapId,
    _id: stageId,
  } = stage || {};
  console.log(stage);
  const {
    updateStage,
    isLoading: updateStageLoading,
    error: updateStageError,
  } = useUpdateStageContent();
  const {
    roadmap: { stagesCount },
    isLoading: roadmapLoading,
    error: roadmapError,
  } = useGetRoadmap();

  useEffect(() => {
    if (videos?.length > 0) {
      const videoId = videos[0].url.slice(videos[0].url.indexOf("v=") + 2);
      setSelectedVideo(videoId);
    }
  }, [videos]);

  useEffect(() => {
    if (number === stagesCount) {
      setIsNextStageDisabled(true);
    }
    if (
      selectedVideo ===
      videos?.at(-1)?.url?.slice(videos?.at(-1)?.url?.indexOf("v=") + 2)
    ) {
      setIsNextStageDisabled(false);
    }
  }, [number, stagesCount, selectedVideo]);

  function handleDeleteVideo(video) {
    const newVideos = videos.filter((v) => v.url !== video.url);
    updateStage({
      stageId,
      data: { ...stage, videos: newVideos },
    });
  }

  function handleEditVideo(video) {
    setEditingVideoId(video.url);
    setEditFormData({
      title: video.title,
      url: video.url,
    });
  }

  function handleSaveEdit() {
    const newVideos = videos.map((video) => {
      if (video.url === editingVideoId) {
        return {
          ...video,
          title: editFormData.title,
          url: editFormData.url.slice(
            0,
            editFormData.url.indexOf("&") === -1
              ? editFormData.url.length
              : editFormData.url.indexOf("&"),
          ),
        };
      }
      return video;
    });

    updateStage({
      stageId,
      data: { ...stage, videos: newVideos },
    });

    setEditingVideoId(null);
    setEditFormData({ title: "", url: "" });
  }

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
  };
  const onSubmit = (data) => {
    console.log(data);
    const newVideos = data.videos.map((video) => ({
      ...video,
      url: video.url.slice(0, video.url.indexOf("&")),
    }));
    const newStage = {
      ...stage,
      videos: [...stage.videos, ...newVideos],
    };
    console.log(newStage);
    updateStage({
      stageId,
      data: newStage,
    });
  };

  if (isLoading || roadmapLoading) return <Loader />;
  if (error || roadmapError) return <div>Error: {error.message}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="from-footer-900 to-footer-800 min-h-screen bg-gradient-to-b"
    >
      <div className="overflow-y-auto px-6 py-6 text-white">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/roadmaps/${roadmapId}`)}
            className="bg-footer-900/70 hover:bg-primary-600 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-lg transition-all duration-300"
          >
            <FaArrowLeft />
            <span className="font-bold capitalize">Back to roadmap</span>
          </motion.button>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-primary-700 rounded-full px-4 py-2 text-sm font-bold text-white select-none"
          >
            Stage {number} of {stagesCount}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-10 space-y-4"
        >
          <div className="flex items-center gap-4">
            <span className="bg-primary-700 rounded-full px-4 py-2 text-sm font-bold text-white capitalize select-none">
              {type}
            </span>
            <h2 className="text-3xl font-semibold capitalize">{title}</h2>
          </div>
          <p className="text-lg text-gray-400/80">{stage?.description}</p>
        </motion.div>

        <div>
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Videos</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isNextStageDisabled}
                className={`group flex items-center gap-2 rounded-full px-4 py-2 text-lg font-bold text-white capitalize select-none ${
                  number === stagesCount ? "cursor-not-allowed opacity-50" : ""
                } ${
                  isNextStageDisabled
                    ? "cursor-not-allowed bg-gray-600"
                    : "bg-primary-700 hover:bg-primary-600 cursor-pointer"
                } `}
                onClick={() => updateStage()}
              >
                next stage
                <FaArrowRight />
              </motion.button>
            </div>

            <div className="mt-6 flex gap-6">
              <AnimatePresence mode="wait">
                {role === "student" ? (
                  <motion.div
                    key="player"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="overflow-hidden rounded-xl shadow-2xl"
                  >
                    <YoutubePlayer
                      key={selectedVideo}
                      videoId={selectedVideo}
                      width="1000rem"
                      height="600px"
                    />
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-footer-900/50 flex grow flex-col items-center gap-4 overflow-hidden rounded-xl p-6 backdrop-blur-sm"
                  >
                    <h3 className="text-2xl font-semibold">Add Videos</h3>
                    <AnimatePresence>
                      {videosArray.map((video, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex w-full gap-4"
                        >
                          <input
                            type="text"
                            placeholder="Video Title"
                            className="bg-footer-800 ring-primary-500 flex-1 rounded-lg px-4 py-2 text-white outline-none focus:ring-2"
                            {...register(`videos.${index}.title`, {
                              required: true,
                            })}
                          />
                          <input
                            type="text"
                            placeholder="Video URL"
                            className="bg-footer-800 ring-primary-500 flex-1 rounded-lg px-4 py-2 text-white outline-none focus:ring-2"
                            {...register(`videos.${index}.url`, {
                              required: true,
                            })}
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => {
                              setVideosArray((curr) =>
                                curr.filter((_, i) => i !== index),
                              );
                              const values = getValues();
                              const newVideos = values.videos.filter(
                                (_, i) => i !== index,
                              );
                              setValue("videos", newVideos);
                            }}
                            className="text-xl text-red-400 hover:text-red-500"
                          >
                            <FaTrash />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() =>
                          setVideosArray([
                            ...videosArray,
                            { title: "", url: "" },
                          ])
                        }
                        className="bg-primary-700 hover:bg-primary-600 rounded-full px-6 py-2 font-bold text-white transition-colors"
                      >
                        <FaPlus />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-primary-700 hover:bg-primary-600 rounded-full px-6 py-2 font-bold text-white transition-colors"
                      >
                        Add Videos
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-footer-900/70 flex-1 rounded-xl p-6 backdrop-blur-sm"
              >
                <h3 className="border-b border-gray-700 pb-4 text-center text-4xl font-semibold tracking-wider">
                  Playlist
                </h3>
                <ul className="mt-6 max-h-[500px] space-y-4 divide-y divide-gray-700/50 overflow-y-auto">
                  <AnimatePresence>
                    {videos?.map((video) => {
                      const videoId = video.url.slice(
                        video.url.indexOf("v=") + 2,
                      );
                      return (
                        <motion.li
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          key={videoId}
                          className={`group hover:bg-footer-800/50 relative mr-5 flex cursor-pointer items-center gap-4 rounded-lg p-4 transition-all duration-300 ${
                            selectedVideo === videoId ? "bg-primary-700" : ""
                          }`}
                          onClick={() => handleVideoSelect(videoId)}
                        >
                          <div className="relative h-[100px] w-[150px] overflow-hidden rounded-lg">
                            <img
                              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                              alt={video.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                              <FaPlay className="text-4xl text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            {editingVideoId === video.url ? (
                              <div className="flex flex-col gap-2">
                                <input
                                  type="text"
                                  value={editFormData.title}
                                  onChange={(e) =>
                                    setEditFormData({
                                      ...editFormData,
                                      title: e.target.value,
                                    })
                                  }
                                  className="bg-footer-800 ring-primary-500 rounded-lg px-4 py-2 text-white outline-none focus:ring-2"
                                />
                                <input
                                  type="text"
                                  value={editFormData.url}
                                  onChange={(e) =>
                                    setEditFormData({
                                      ...editFormData,
                                      url: e.target.value,
                                    })
                                  }
                                  className="bg-footer-800 ring-primary-500 rounded-lg px-4 py-2 text-white outline-none focus:ring-2"
                                />
                              </div>
                            ) : (
                              <>
                                <p className="text-lg font-medium text-gray-200 transition-colors group-hover:text-white">
                                  {video.title}
                                </p>
                                <span className="text-sm text-gray-400">
                                  Click to play
                                </span>
                              </>
                            )}
                          </div>
                          {role !== "student" && (
                            <motion.div className="ml-auto flex items-center gap-2">
                              {editingVideoId === video.url ? (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  type="button"
                                  className="ml-auto cursor-pointer text-2xl text-green-400"
                                  onClick={handleSaveEdit}
                                >
                                  <FaSave />
                                </motion.button>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  type="button"
                                  className="ml-auto cursor-pointer text-2xl text-white"
                                  onClick={() => handleEditVideo(video)}
                                >
                                  <FaEdit />
                                </motion.button>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => handleDeleteVideo(video)}
                                className="ml-auto cursor-pointer text-xl text-red-400 hover:text-red-500"
                              >
                                <FaTrash />
                              </motion.button>
                            </motion.div>
                          )}
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10"
          >
            <h2 className="text-2xl font-semibold">Documents</h2>
            <ul className="mt-4 flex flex-wrap items-center gap-6">
              {docs?.map((doc) => (
                <motion.li
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  key={doc.id}
                >
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex cursor-pointer flex-col items-center gap-3"
                  >
                    <div className="group-hover:shadow-primary-500/20 overflow-hidden rounded-xl shadow-lg transition-transform duration-300">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${doc.url}&sz=128`}
                        alt="Document icon"
                        className="h-12 w-12 object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p className="group-hover:text-primary-500 text-lg text-gray-400 transition-colors">
                      {doc.title}
                    </p>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default VideoContent;
