import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export function useEditNotification() {
  const queryClient = useQueryClient();
  const { mutate: editNotification, isLoading: isEditing } = useMutation({
    mutationFn: async ({ text }) => {
      const response = await fetch(`/api/admin/notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to edit notification");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
      toast.success("Notification updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editNotification, isEditing };
}
