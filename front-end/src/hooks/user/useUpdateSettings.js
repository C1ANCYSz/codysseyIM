import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading } = useMutation({
    mutationFn: async (settings) => {
      const response = await fetch(`http://localhost:3000/api/user/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ refetchType: "active" });
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSettings, isLoading };
}
