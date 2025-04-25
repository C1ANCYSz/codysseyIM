import { useQuery } from "@tanstack/react-query";

export function useGetAppointments() {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async function () {
      try {
        const response = await fetch(
          `http://localhost:3000/api/student/appointments`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const { data } = await response.json();
        return data.appointments;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  return { appointments, isLoading };
}
