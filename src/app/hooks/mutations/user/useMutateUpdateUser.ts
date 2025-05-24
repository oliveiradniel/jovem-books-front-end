import { useMutation, useQueryClient } from '@tanstack/react-query';

import UsersService from '../../../services/UsersService';

import { TUpdateUser } from '../../../../@types/User';
import { TMimeType } from '../../../../@types/S3';

export function useMutateUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (variables: TUpdateUser) => {
      await UsersService.updateUser(variables);

      const { file } = variables;

      if (file !== null) {
        const { url, key } = await UsersService.getPreSignedURL({
          mimeType: file.type as TMimeType,
          fileSize: file.size,
        });

        await UsersService.uploadImageS3({ preSignedURL: url, file });

        await UsersService.updateImage(key);
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
