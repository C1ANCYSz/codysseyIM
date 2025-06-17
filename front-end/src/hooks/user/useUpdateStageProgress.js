import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export const useUpdateStageProgress = () => {
  const queryClient = useQueryClient();
  const { roadmapId, stageNumber } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    mutate: updateStageProgress,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `/api/student/roadmaps/${roadmapId}/progress`,
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
        queryClient.invalidateQueries({
          refetchType: "active",
        });

        if (data.completed) navigate(`/roadmaps/${roadmapId}`);
        else
          navigate(`/roadmaps/${roadmapId}/stage/${Number(stageNumber) + 1}`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateStageProgress, isLoading, error };
};
