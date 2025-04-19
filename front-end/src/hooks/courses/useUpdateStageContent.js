import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useUpdateStageContent() {
  const { roadmapId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: updateStage,
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
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { updateStage, isLoading, error };
}
