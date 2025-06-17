import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/check", {
        method: "GET",
        credentials: "include", // Sends cookie
      });
      const data = await res.json();
      return data.user;
    },
  });
  return { user, isLoading, error };
}
