import { fetchUsers } from "../services/users";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { 
    isLoading, 
    isError, 
    data, 
    refetch, 
    fetchNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: ["users"], // <-- almacena los datos  poner así en React Query v5
    queryFn: fetchUsers, // La función que obtiene los datos
    initialPageParam: 1, 
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null, // Manejo seguro del `nextCursor`
    refetchOnWindowFocus: false
  });

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [], 
    hasNextPage,
  };
};