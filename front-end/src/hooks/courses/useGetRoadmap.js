import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetRoadmap = () => {
  const { id } = useParams();
  const {
    data: roadmap,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/roadmaps/${id}`);
      const {
        data: { roadmap },
      } = await response.json();
      console.log(roadmap);
      return roadmap;
    },
  });
  return { roadmap, isLoading, error };
};
