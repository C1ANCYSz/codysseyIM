import { useQuery } from "@tanstack/react-query";

export const useGetAdminDashboard = () => {
  const {
    data: { data: dashboardData } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/admin/dashboard`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  return { dashboardData, isLoading, error };
};
