import Sidebar from "../../ui/Sidebar";
import { useGetStage } from "../../hooks/courses/useGetStage";
import { useGetRoadmap } from "../../hooks/courses/useGetRoadmap";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import YoutubePlayer from "../../ui/YoutubePlayer";
import { useEffect, useState } from "react";

function Stage() {
  const navigate = useNavigate();
  const { stage: { stage } = {}, isLoading, error } = useGetStage();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {
    description,
    docs,
    number,
    title,
    type,
    updatedAt,
    videos,
    roadmap: roadmapId,
  } = stage || {};
  console.log("stage", stage);

  useEffect(() => {
    if (videos?.length > 0) {
      const videoId = videos[0].url.slice(videos[0].url.indexOf("v=") + 2);
      setSelectedVideo(videoId);
    }
  }, [videos]);

  const {
    roadmap: { category, title: roadmapTitle, stagesCount },
    isLoading: roadmapLoading,
    error: roadmapError,
  } = useGetRoadmap();

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
  };

  if (isLoading || roadmapLoading) return <div>Loading...</div>;
  if (error || roadmapError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto px-6 py-6 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/roadmaps/${roadmapId}`)}
            className="bg-footer-900/70 hover:bg-primary-600 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-lg transition-all duration-300"
          >
            <FaArrowLeft />
            <span className="font-bold capitalize">Back to roadmap</span>
          </button>
          <p className="bg-primary-700 rounded-full px-4 py-2 text-sm font-bold text-white select-none">
            Stage {number} of {stagesCount}
          </p>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary-700 rounded-full px-4 py-2 text-sm font-bold text-white capitalize select-none">
              {type}
            </span>
            <h2 className="text-3xl font-semibold capitalize">{title}</h2>
          </div>
          <p className="text-lg text-gray-400/80">{stage.description}</p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Videos</h2>
          <div className="mt-6 flex gap-6">
            <div className="overflow-hidden rounded-xl">
              <YoutubePlayer
                key={selectedVideo}
                videoId={selectedVideo}
                width="1000rem"
                height="600px"
              />
            </div>
            <div className="bg-footer-900/70 flex-1 rounded-xl p-4">
              <h3 className="border-b border-gray-700 pb-4 text-center text-4xl font-semibold tracking-wider">
                Playlist
              </h3>
              <ul className="mt-4 space-y-2 divide-y divide-gray-700">
                {videos?.map((video) => {
                  const videoId = video.url.slice(video.url.indexOf("v=") + 2);
                  return (
                    <li
                      key={videoId}
                      className={`group hover:bg-footer-800/50 relative flex cursor-pointer items-center gap-4 rounded-lg p-2 transition-all duration-300 ${
                        selectedVideo === videoId ? "bg-primary-700" : ""
                      }`}
                      onClick={() => handleVideoSelect(videoId)}
                    >
                      <div className="relative h-[100px] w-[150px]">
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                          alt={`Thumbnail for ${video.title}`}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <FaPlay className="text-4xl text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-lg font-medium text-gray-200 transition-colors group-hover:text-white">
                          {video.title}
                        </p>
                        <span className="text-sm text-gray-400">
                          Click to play
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Documents</h2>
          <ul className="mt-4 flex items-center gap-4">
            {docs?.map((doc) => (
              <li key={doc.id} className="flex items-center gap-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 group flex cursor-pointer flex-col items-center gap-2"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${doc.url}&sz=128`}
                    alt="Document icon"
                    className="rounded-md object-contain transition-all duration-300 group-hover:scale-105"
                  />
                  <p className="text-xl text-gray-400">{doc.title}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Stage;
