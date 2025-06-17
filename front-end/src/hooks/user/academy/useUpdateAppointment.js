import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateAppointment() {
  const queryClient = useQueryClient();
  const { mutate: updateAppointment, isLoading } = useMutation({
    mutationFn: async function ({ appointmentId, data }) {
      try {
        const res = await fetch(`/api/academy/appointments/${appointmentId}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
        return res.json();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Appointment updated successfully");
      queryClient.invalidateQueries({
        refetchType: "active",
      });
    },
    onError: () => {
      toast.error("Failed to update appointment");
    },
  });

  return { updateAppointment, isLoading };
}
