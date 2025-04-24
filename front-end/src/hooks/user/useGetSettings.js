import { useQuery } from "@tanstack/react-query";

export function useGetSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/settings`,
          {
            credentials: "include",
          },
        );
        const { data } = await response.json();
        return data.user;
      } catch (error) {
        throw error;
      }
    },
  });

  return { settings, isLoading, error };
}
