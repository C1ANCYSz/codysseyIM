import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddContentManager() {
  const queryClient = useQueryClient();
  const { mutate: addContentManager, isLoading } = useMutation({
    mutationFn: async function (email) {
      try {
        const response = await fetch(
          `/api/admin/content-managers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(email),
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to add content manager");
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["content-managers"],
        refetchType: "active",
      });
      toast.success(`${data.data.user.name} added as content manager`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addContentManager, isLoading };
}
