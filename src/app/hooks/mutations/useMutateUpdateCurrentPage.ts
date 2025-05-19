import { useMutation, useQueryClient } from '@tanstack/react-query';

import ReadsService from '../../services/ReadsService';

import { delay } from '../../../utils/delay';
import { emitToast } from '../../../utils/emitToast';

interface UseMutationProps {
  bookId: string;
  page: number;
}

export function useMutateUpdateCurrentPage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ bookId, page }: UseMutationProps) => {
      await delay(6000);

      return await ReadsService.updateRead({
        bookId,
        currentPage: page,
      });
    },
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({
        queryKey: ['read', { bookId }],
      });
    },
    onError: () => {
      emitToast({
        type: 'error',
        message: `Não foi possível atualizar a página.`,
      });
    },
  });

  return {
    updateCurrentPage: mutateAsync,
    isUpdatingCurrentPage: isPending,
  };
}
