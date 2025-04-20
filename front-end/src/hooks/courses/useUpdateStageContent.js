import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUpdateStageContent() {
  const { roadmapId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: updateStageContent,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ stageId, data }) => {
      console.log(data);
      try {
        const res = await fetch(
          `http://localhost:3000/api/roadmaps/${roadmapId}/update-stage/${stageId}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (!res.ok) {
          throw new Error("Failed to update stage");
        }
        return res.json();
      } catch (err) {
        throw new Error(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "active",
      });
      toast.success("Stage content updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateStageContent, isLoading, error };
}
