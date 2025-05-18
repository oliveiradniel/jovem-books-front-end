import { useMutation, useQueryClient } from '@tanstack/react-query';

import UsersService from '../../services/UsersService';

import { TUpdateUser } from '../../../@types/User';

export function useMutateUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (variables: TUpdateUser) => {
      await UsersService.updateUser(variables);
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
