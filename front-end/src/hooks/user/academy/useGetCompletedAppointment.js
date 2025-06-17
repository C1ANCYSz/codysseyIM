import { useQuery } from "@tanstack/react-query";

export function useGetCompletedAppointment() {
  const { data: completedAppointments, isLoading } = useQuery({
    queryKey: ["academy-completed-appointments"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/academy/appointments/completed`, {
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
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  return { completedAppointments, isLoading };
}
