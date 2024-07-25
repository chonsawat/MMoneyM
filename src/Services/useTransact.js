import { useQuery } from "@tanstack/react-query";
import { getTransactDesc, getTransactAsc } from "./apiTransact";

export function useTransact(pageNumber, descending) {
  const {
    isLoading,
    data: transacts,
    error,
  } = useQuery({
    queryKey: ["transacts", pageNumber, descending],
    queryFn: () => {
      return descending === true
        ? getTransactDesc(pageNumber)
        : getTransactAsc(pageNumber);
    },
    staleTime: 1000 * 10,
  });

  return { isLoading, transacts, error };
}
