import { useMutation, useQueryClient } from '@tanstack/react-query';

import ReadsService from '../../../services/ReadsService';

import { emitToast } from '../../../../utils/emitToast';

export function useMutateStartRead() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ bookId }: { bookId: string }) => {
      return await ReadsService.createRead({
        bookId,
      });
    },
    onSuccess: (_, { bookId }) => {
      emitToast({
        type: 'success',
        message: `Boa leitura.`,
      });

      queryClient.invalidateQueries({
        queryKey: ['read', { bookId }],
      });

      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: () => {
      emitToast({
        type: 'error',
        message: `Não foi possível iniciar a leitura.`,
      });
    },
  });

  return {
    startRead: mutateAsync,
    isStartingRead: isPending,
  };
}
