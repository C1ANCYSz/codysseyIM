import { useQuery } from "@tanstack/react-query";

export function useGetAcceptedAppointment() {
  const { data: acceptedAppointments, isLoading } = useQuery({
    queryKey: ["academy-accepted-appointments"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/academy/appointments/accepted`,
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

  return { acceptedAppointments, isLoading };
}
