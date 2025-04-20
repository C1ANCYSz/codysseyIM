import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useDeleteStage() {
  const { roadmapId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteStage, isLoading } = useMutation({
    mutationFn: async (stageId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/roadmaps/${roadmapId}/delete-stage/${stageId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        return response.json();
      } catch (error) {
        console.error("Error deleting stage:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ refetchType: "active" });
      toast.success("Stage deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteStage, isLoading };
}
