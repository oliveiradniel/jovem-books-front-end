import { useQuery } from '@tanstack/react-query';

import BooksService from '../../../services/BooksService';

export function useQueryGetBookById(id: string) {
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ['book', { id }],
    staleTime: Infinity,
    queryFn: async () => {
      return await BooksService.getBookById({
        id,
      });
    },
  });

  return {
    book: data,
    isLoadingBook: isLoading,
    isRefetchingBook: isFetching,
    bookError: error,
    hasError: isError,
  };
}
