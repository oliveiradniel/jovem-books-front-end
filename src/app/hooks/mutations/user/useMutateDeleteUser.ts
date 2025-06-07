import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../useAuth';

import { AxiosError } from 'axios';

import UsersService from '../../../services/UsersService';

import { emitToast } from '../../../../utils/emitToast';

export function useMutateDeleteUser() {
  const { signOut } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await UsersService.deleteUser();
    },
    onSuccess: () => {
      signOut();

      emitToast({
        type: 'success',
        message: 'Seu usuário foi excluído com sucesso.',
      });

      queryClient.clear();
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
        message: 'Não foi possível excluir seu usuário.',
      });
    },
  });

  return {
    deleteUser: mutate,
    isDeleting: isPending,
  };
}
