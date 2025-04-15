import { useGetRoadmap } from "../../hooks/courses/useGetRoadmap";

function Roadmap() {
  const { roadmap, isLoading, error } = useGetRoadmap();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Roadmap</div>;
}

export default Roadmap;
