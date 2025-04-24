import { useQuery } from "@tanstack/react-query";

export function useGetNotification() {
  const {
    data: notification,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/notification",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notification");
        }
        const { data } = await response.json();
        return data.notification;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { notification, isLoading, error };
}
