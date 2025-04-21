import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export function useLogin() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser, setIsLoading } = useAuth();
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        setIsLoading(true);
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
          setUser(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      toast.success("Login successful");
      navigate("/dashboard");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return { login, isLoading, error };
}
