import { useMutation, useQueryClient } from '@tanstack/react-query';

import UsersService from '../../../services/UsersService';
import S3Service from '../../../services/S3Service';

import { TUpdateUser } from '../../../../@types/User';
import { TMimeType } from '../../../../@types/S3';

export function useMutateUpdateUser({
  currentImagePath,
}: {
  currentImagePath: string | null;
}) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (variables: TUpdateUser) => {
      const { file } = variables;
      let key: string | undefined;

      if (file !== null) {
        const data = await UsersService.getPreSignedURL({
          mimeType: file.type as TMimeType,
          fileSize: file.size,
        });

        key = data.key;

        await S3Service.uploadImageS3({ preSignedURL: data.url, file });
      }

      return await UsersService.updateUser({
        ...variables,
        imagePath: key ?? currentImagePath,
      });
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
