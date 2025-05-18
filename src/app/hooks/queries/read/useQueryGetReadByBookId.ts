import { useQuery } from '@tanstack/react-query';

import ReadsService from '../../../services/ReadsService';
import { delay } from '../../../../utils/delay';

interface UseQueryGetReadByBookId {
  bookId: string;
}

export function useQueryGetReadByBookId({ bookId }: UseQueryGetReadByBookId) {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['read', { bookId }],
    queryFn: async () => {
      await delay(6000);

      return await ReadsService.getReadByBookId({
        bookId,
      });
    },
  });

  return {
    read: data ?? null,
    isLoadingRead: isLoading,
    isRefetchingRead: isRefetching,
  };
}
