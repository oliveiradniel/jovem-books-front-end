import { useQuery } from '@tanstack/react-query';

import ReadsService from '../../../services/ReadsService';

interface UseQueryGetReadByBookId {
  bookId: string;
}

export function useQueryGetReadByBookId({ bookId }: UseQueryGetReadByBookId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['read', { bookId }],
    queryFn: async () => {
      return await ReadsService.getReadByBookId({
        bookId,
      });
    },
  });

  return {
    readData: data ?? null,
    readError: error,
    isLoadingRead: isLoading,
  };
}
