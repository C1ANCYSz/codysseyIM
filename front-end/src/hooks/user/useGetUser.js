import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:3000/api/student/dashboard", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        return data.data.user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { userData, isLoading, error };
}
