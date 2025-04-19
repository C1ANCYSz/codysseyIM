import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useAddStage() {
  const queryClient = useQueryClient();
  const { roadmapId } = useParams();
  const { mutate: addStage, isLoading } = useMutation({
    mutationFn: async (newStage) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/roadmaps/${roadmapId}/add-stage`,
          {
            method: "POST",
            body: JSON.stringify(newStage), // Remove the data wrapper
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to add stage");
        }
        return res.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roadmap", roadmapId],
      });
      toast.success("Stage added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addStage, isLoading };
}
