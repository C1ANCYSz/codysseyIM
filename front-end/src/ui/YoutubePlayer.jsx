import YouTube from "react-youtube";

function YoutubePlayer({ videoId, width, height }) {
  const opts = {
    width: width,
    height: height,
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      controls: 1,
      disablekb: 1,
    },
  };
  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
}

export default YoutubePlayer;
