import Sidebar from "../../ui/Sidebar";
import { useGetStage } from "../../hooks/courses/useGetStage";
function Stage() {
  const {
    stage: { stage },
    isLoading,
    error,
  } = useGetStage();
  console.log("stage", stage);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <h1>{stage.title}</h1>
      </div>
    </div>
  );
}

export default Stage;
