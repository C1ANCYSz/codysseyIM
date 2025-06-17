import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddAcademy() {
  const queryClient = useQueryClient();
  const { mutate: addAcademy, isLoading } = useMutation({
    mutationFn: async function (academy) {
      try {
        const response = await fetch(`/api/admin/academies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(academy),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to add academy");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["academies"],
      });
      toast.success(`Email added as academy`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addAcademy, isLoading };
}
