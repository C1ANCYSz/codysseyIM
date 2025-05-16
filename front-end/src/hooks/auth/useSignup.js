import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export function useSignup() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ name, email, password, confirmPassword }) => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, confirmPassword }),
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
      }
    },
    onSuccess: () => {
      toast.success("Signup successful");
      navigate("/dashboard");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  return { signup, isLoading, error };
}
