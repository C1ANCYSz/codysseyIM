import { useQuery } from "@tanstack/react-query";

export function useGetDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["academy-dashboard"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/academy/dashboard`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const { data } = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  return { data, isLoading };
}
