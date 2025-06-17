import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export function useLogout() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const queryClient = useQueryClient(); // Access the React Query client

  const {
    mutate: logout,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setIsLoggedIn(false);
          navigate("/");
          // Clear the React Query cache
          queryClient.clear();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Logout successful");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return { logout, isLoading, error };
}
