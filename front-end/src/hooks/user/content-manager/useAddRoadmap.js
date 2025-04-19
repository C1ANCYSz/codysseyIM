import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useAddRoadmap() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addRoadmap, isLoading } = useMutation({
    mutationFn: async (roadmap) => {
      try {
        const res = await fetch("http://localhost:3000/api/roadmaps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(roadmap),
        });
        if (!res.ok) {
          throw new Error("Failed to add roadmap");
        }
        return res.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["roadmaps"] });
      toast.success("Roadmap added successfully");
      navigate(`/roadmaps/${data.data.roadmap._id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addRoadmap, isLoading };
}
