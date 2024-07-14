import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTransact } from "./apiTransact";

export function useAddTransact() {
  const queryClient = useQueryClient();

  const { mutate: createTransact, isLoading: isCreating } = useMutation({
    mutationFn: addTransact,
    onSuccess: () => {
      console.log("New transact successfully created");
      queryClient.invalidateQueries({ queryKey: ["transacts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTransact };
}
