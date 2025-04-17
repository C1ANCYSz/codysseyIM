import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
export const useUpdateStage = () => {
  const queryClient = useQueryClient();
  const { roadmapId, stageNumber } = useParams();
  const navigate = useNavigate();
  const {
    mutate: updateStage,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/student/roadmaps/${roadmapId}/progress`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              completedStages: Number(stageNumber),
            }),
          },
        );
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ type: "active" });
        if (data.completed) navigate(`/roadmaps/${roadmapId}`);
        else
          navigate(`/roadmaps/${roadmapId}/stage/${Number(stageNumber) + 1}`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateStage, isLoading, error };
};
