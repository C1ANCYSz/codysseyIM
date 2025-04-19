import { useGetContentManager } from "../../hooks/user/content-manager/useGetContentManager";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import Roadmaps from "../../pages/Roadmaps";
import RoadmapModal from "../content/AddRoadmap";
import { useEffect } from "react";

function ContentManagerDashboard() {
  const { contentManagerData, isLoading, error } = useGetContentManager();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/roadmaps");
  }, []);
  if (isLoading) {
    return <Loader />;
  }
}

export default ContentManagerDashboard;
