import { useQuery } from "@tanstack/react-query";

export function useGetContentManager() {
  const {
    data: contentManagerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contentManager"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/content-manager/dashboard",
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        return data.roadmaps;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { contentManagerData, isLoading, error };
}
