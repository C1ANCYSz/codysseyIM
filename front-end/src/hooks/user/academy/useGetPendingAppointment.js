import { useQuery } from "@tanstack/react-query";

export function useGetPendingAppointment() {
  const { data: pendingAppointments, isLoading } = useQuery({
    queryKey: ["academy-pending-appointments"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/academy/appointments/pending`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  return { pendingAppointments, isLoading };
}
