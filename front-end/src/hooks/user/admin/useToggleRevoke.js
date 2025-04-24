import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export const useToggleRevoke = () => {
  const queryClient = useQueryClient();
  const { mutate: toggleRevoke, isLoading } = useMutation({
    mutationFn: async (email) => {
      const response = await fetch(
        `http://localhost:3000/api/admin/toggle-revoke`,
        {
          method: "PUT",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "active",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { toggleRevoke, isLoading };
};
