import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMutateUpdateUserAvatar } from './useMutateUpdateUserAvatar';

import UsersService from '../../../services/UsersService';

import { TUpdateUser } from '../../../../@types/User';

export function useMutateUpdateUser() {
  const queryClient = useQueryClient();

  const { updateAvatar } = useMutateUpdateUserAvatar();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (variables: TUpdateUser) => {
      await UsersService.updateUser(variables);

      if (variables.file !== null) {
        updateAvatar(variables.file);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });

  return {
    updateUser: mutateAsync,
    isUpdatingUser: isPending,
  };
}
