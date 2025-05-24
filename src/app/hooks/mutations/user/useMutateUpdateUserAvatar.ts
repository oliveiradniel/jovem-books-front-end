import { useMutation } from '@tanstack/react-query';

import UsersService from '../../../services/UsersService';

import { TMimeType } from '../../../../@types/S3';

export function useMutateUpdateUserAvatar() {
  const { mutate } = useMutation({
    mutationFn: async (file: File) => {
      const { url, key } = await UsersService.getPreSignedURL({
        mimeType: file.type as TMimeType,
        fileSize: file.size,
      });

      await UsersService.uploadAvatarS3({ preSignedURL: url, file });

      await UsersService.updateImage(key);
    },
  });

  return {
    updateAvatar: mutate,
  };
}
