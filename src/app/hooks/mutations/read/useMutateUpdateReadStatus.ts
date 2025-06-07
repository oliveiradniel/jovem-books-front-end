import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../useAuth';

import { AxiosError } from 'axios';

import ReadsService from '../../../services/ReadsService';

import { emitToast } from '../../../../utils/emitToast';

import { TReadingStatus } from '../../../../@types/Read';

interface UseMutationProps {
  bookId: string;
  status: TReadingStatus;
}

export function useMutateUpdateReadStatus() {
  const { signOut } = useAuth();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ bookId, status }: UseMutationProps) => {
      return await ReadsService.updateRead({
        bookId,
        status,
      });
    },
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });

      queryClient.invalidateQueries({
        queryKey: ['read', { bookId }],
      });
    },
    onError: (error, { status }) => {
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
