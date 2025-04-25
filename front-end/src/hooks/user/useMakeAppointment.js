import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useMakeAppointment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: makeAppointment, isLoading } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/student/book-appointment`,
          {
            method: "POST",
            body: JSON.stringify(data),
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
        return response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Appointment booked successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      navigate("/appointments");
    },
    onError: () => {
      toast.error("Failed to book appointment");
    },
  });
  return { makeAppointment, isLoading };
}
