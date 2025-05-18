import { useQuery } from '@tanstack/react-query';

import BooksService from '../../../services/BooksService';
import { delay } from '../../../../utils/delay';

export function useQueryListBooks() {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['books'],
    staleTime: Infinity,
    queryFn: async () => {
      await delay(3000);

      return await BooksService.listBooks();
    },
  });

  return {
    booksList: data ?? [],
    isLoadingBooks: isLoading,
    isRefetchingBooks: isFetching,
    isError,
    refetch,
  };
}
