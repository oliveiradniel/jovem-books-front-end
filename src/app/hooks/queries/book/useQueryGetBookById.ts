import { useQuery } from '@tanstack/react-query';

import BooksService from '../../../services/BooksService';

export function useQueryGetBookById(id: string) {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['book', { id }],
    staleTime: Infinity,
    queryFn: async () => {
      return await BooksService.getBookById({
        id,
      });
    },
  });

  return {
    bookData: data,
    isLoadingBook: isLoading,
    isRefetchingBook: isFetching,
    isError,
  };
}
