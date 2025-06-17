import { useQuery } from "@tanstack/react-query";

export function useGetRecommendations() {
  const {
    data: recommendations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/student/roadmaps/recommended", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data.roadmaps || [];
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { recommendations, isLoading, error };
}
