import { useMutation, useQueryClient } from '@tanstack/react-query';

import ReadsService from '../../../services/ReadsService';

import { emitToast } from '../../../../utils/emitToast';

import { ReadingStatus } from '../../../../@types/Book';

interface UseMutationProps {
  bookId: string;
  status: ReadingStatus;
}

export function useMutateUpdateReadStatus() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ bookId, status }: UseMutationProps) => {
      return await ReadsService.updateRead({
        bookId,
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: (_, { status }) => {
      if (status === 'READING') {
        emitToast({
          type: 'error',
          message: `Não foi possível pausar a leitura.`,
        });
      } else if (status === 'ON_HOLD') {
        emitToast({
          type: 'error',
          message: `Não foi possível retomar a leitura.`,
        });
      } else if (status === 'FINISHED') {
        emitToast({
          type: 'error',
          message: `Não foi possível finalizar a leitura.`,
        });
      }
    },
  });

  return {
    updateReadStatus: mutateAsync,
    isUpdatingReadStatus: isPending,
  };
}
