import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export const useUpdateQuestionnaire = () => {
  const queryClient = useQueryClient();
  const { mutate: updateQuestionnaire, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/student/skip-questionnare",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Questionnaire updated successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateQuestionnaire, isLoading };
};
