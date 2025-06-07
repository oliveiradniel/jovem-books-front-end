import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../useAuth';

import { AxiosError } from 'axios';

import ReadsService from '../../../services/ReadsService';

import { delay } from '../../../../utils/delay';
import { emitToast } from '../../../../utils/emitToast';

interface UseMutationProps {
  bookId: string;
  page: number;
}

export function useMutateUpdateCurrentPage() {
  const { signOut } = useAuth();

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
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message as string;

        if (errorMessage && errorMessage.includes('Invalid access token')) {
          signOut();

          emitToast({
            type: 'error',
            message: 'Suas credenciais expiraram! Faça login novamente.',
          });

          return;
        }
      }

      emitToast({
        type: 'error',
        message: `Não foi possível atualizar a página atual.`,
      });
    },
  });

  return {
    updateCurrentPage: mutateAsync,
    isUpdatingCurrentPage: isPending,
  };
}
