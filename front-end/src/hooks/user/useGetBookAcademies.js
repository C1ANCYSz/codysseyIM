import { useQuery } from "@tanstack/react-query";

export function useGetBookAcademies() {
  const { data: academies, isLoading } = useQuery({
    queryKey: ["academies"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/student/book-appointment",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const { data } = await response.json();
        return data.academies;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  return { academies, isLoading };
}
