import { useQuery } from "@tanstack/react-query";
import { getTransact } from "./apiTransact";

export function useTransact() {
  const {
    isLoading,
    data: transacts,
    error,
  } = useQuery({
    queryKey: ["transacts"],
    queryFn: getTransact,
  });

  return { isLoading, transacts, error };
}
