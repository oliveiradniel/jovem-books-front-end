import { useQuery } from '@tanstack/react-query';
import BooksService from '../../../services/BooksService';

export function useQueryListBooks() {
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['books'],
    staleTime: Infinity,
    queryFn: async () => await BooksService.listBooks(),
  });

  return {
    booksList: data ?? [],
    isLoadingBooks: isFetching,
    isError,
    refetch,
  };
}
