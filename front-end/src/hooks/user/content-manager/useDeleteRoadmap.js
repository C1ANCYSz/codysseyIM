import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
export function useDeleteRoadmap() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { roadmapId } = useParams();
  const { mutate: deleteRoadmap, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/roadmaps/${roadmapId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.status !== 204) {
        throw new Error("Failed to delete roadmap");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmaps"] });
      toast.success("Roadmap deleted successfully");
      navigate("/roadmaps");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { deleteRoadmap, isLoading };
}
