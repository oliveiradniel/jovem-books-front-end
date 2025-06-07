import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../useAuth';

import { AxiosError } from 'axios';

import ReadsService from '../../../services/ReadsService';

import { emitToast } from '../../../../utils/emitToast';

export function useMutateStartRead() {
  const { signOut } = useAuth();

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
        message: `Não foi possível iniciar a leitura.`,
      });
    },
  });

  return {
    startRead: mutateAsync,
    isStartingRead: isPending,
  };
}
