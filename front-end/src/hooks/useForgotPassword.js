import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const {
    mutate: forgotPassword,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, setStep }) => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          },
        );
        const data = await res.json();
        if (data.success) {
          setStep(2);
          return data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return { forgotPassword, isLoading, error };
}

export function useVerifyEmail() {
  const {
    data: verifyEmail,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, code, setStep }) => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code, setStep }),
        });
        const data = await res.json();
        if (data.success) {
          setStep(3);
          return data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return { verifyEmail, isLoading, error };
}
