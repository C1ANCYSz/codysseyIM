import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function useLogin() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setIsLoggedIn(true);

          navigate("/dashboard");
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Login successful");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return { login, isLoading, error };
}
