import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../useAuth';

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
    onError: () => {
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
