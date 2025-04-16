import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetRoadmap = () => {
  const { roadmapId } = useParams();
  const {
    data: roadmap,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roadmap", roadmapId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/roadmaps/${roadmapId}`,
        {
          credentials: "include",
        },
      );
      const {
        data: { roadmap },
      } = await response.json();
      return roadmap;
    },
  });
  return { roadmap, isLoading, error };
};
