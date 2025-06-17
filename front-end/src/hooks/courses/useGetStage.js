import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useGetStage() {
  const { roadmapId, stageNumber } = useParams();

  const {
    data: stage,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stage", roadmapId, stageNumber],
    queryFn: async () => {
      try {
        const res = await fetch(
          `/api/roadmaps/${roadmapId}/stages/${stageNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${res.status}`,
          );
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch stage");
        }

        return data.data;
      } catch (error) {
        if (
          error.message === "Failed to fetch" ||
          error.code === "ECONNREFUSED"
        ) {
          toast.error(
            "Cannot connect to server. Please check if the server is running.",
          );
          throw new Error("Server connection failed");
        }
        toast.error(error.message);
        throw error;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  return { stage, isLoading, error };
}
