import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
export function useEnroll() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: enroll,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (roadmapId) => {
      try {
        const res = await fetch(`/api/student/enroll/${roadmapId}`, {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to enroll in roadmap");
        }
        return res.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Enrolled in roadmap successfully");
      queryClient.invalidateQueries({ refetchActive: true });
    },
    onError: () => {
      toast.error("Failed to enroll in roadmap");
    },
  });

  return { enroll, isLoading, error };
}
