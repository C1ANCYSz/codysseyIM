import { useQuery } from "@tanstack/react-query";

export function useGetQuestions() {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/student/questionnare", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data.questions;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { questions, isLoading, error };
}
