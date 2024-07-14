import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteTransact } from "./apiTransact";

export function useDeleteTransact() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: removeTransact } = useMutation({
    mutationFn: deleteTransact,
    onSuccess: () => {
      toast.success("Transaction successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["transacts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, removeTransact };
}
