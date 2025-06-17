import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteAppointment() {
  const queryClient = useQueryClient();
  const { mutate: deleteAppointment, isLoading } = useMutation({
    mutationFn: async (appointmentId) => {
      const response = await fetch(
        `/api/student/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Appointment deleted successfully");
      queryClient.invalidateQueries({
        refetchType: "active",
      });
    },
    onError: () => {
      toast.error("Failed to delete appointment");
    },
  });
  return { deleteAppointment, isLoading };
}
