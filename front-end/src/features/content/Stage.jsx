import { useGetStage } from "../../hooks/courses/useGetStage";
import VideoContent from "./VideoContent";
import Quiz from "./Quiz";
import Loader from "../../ui/Loader";

function Stage() {
  const { stage: { stage } = {}, isLoading } = useGetStage();
  const { type } = stage || {};

  if (isLoading) {
    return <Loader />;
  }
  if (type === "content") {
    return <VideoContent />;
  } else if (type === "quiz") {
    return <Quiz />;
  }
}

export default Stage;
