import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useSubmitQuestionnaire = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: submitAnswers, isLoading } = useMutation({
    mutationFn: async (answers) => {
      try {
        const response = await fetch("/api/student/answer-questionnare", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ selectedAnswers: answers }),
        });
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
      toast.success("Questionnaire Answers submitted successfully");
      navigate("/recommendations");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { submitAnswers, isLoading };
};
