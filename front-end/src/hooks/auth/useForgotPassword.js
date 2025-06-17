import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function useForgotPassword() {
  const {
    mutate: forgotPassword,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, setStep }) => {
      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
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
        const res = await fetch("/api/auth/verify-email", {
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

export function useResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || token.length !== 64) {
      toast.error("Invalid reset token format");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  const {
    mutate: reset,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ password, confirmPassword }) => {
      try {
        const res = await fetch(`/api/auth/reset-password/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirmPassword }),
        });

        const data = await res.json();

        if (data.success) {
          return data;
        } else {
          throw new Error(data.message || "Password reset failed");
        }
      } catch (error) {
        console.error(error); // Log to debug
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  return { reset, isLoading, error };
}
