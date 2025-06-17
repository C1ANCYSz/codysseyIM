import { useQuery } from "@tanstack/react-query";

export const useGetRoadmaps = () => {
  const {
    data: roadmaps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/roadmaps");
        const { data } = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { roadmaps, isLoading, error };
};
