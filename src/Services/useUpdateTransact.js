import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateTransact } from "./apiTransact";

export function useEditTransact() {
  const queryClient = useQueryClient();

  const { mutate: editTransact, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, newData }) => updateTransact(id, newData),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["transacts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTransact };
}
