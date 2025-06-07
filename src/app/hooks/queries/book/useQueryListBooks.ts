import { useQuery } from '@tanstack/react-query';

import BooksService from '../../../services/BooksService';

export function useQueryListBooks() {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ['books'],
    staleTime: Infinity,
    queryFn: async () => {
      return await BooksService.listBooks();
    },
  });

  return {
    booksList: data ?? [],
    isLoadingBooks: isLoading,
    isRefetchingBooks: isFetching,
    bookError: error,
    hasError: isError,
    tryAgain: refetch,
  };
}
