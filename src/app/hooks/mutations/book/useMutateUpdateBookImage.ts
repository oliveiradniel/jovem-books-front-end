import { useMutation, useQueryClient } from '@tanstack/react-query';

import BooksService from '../../../services/BooksService';
import S3Service from '../../../services/S3Service';

import { emitToast } from '../../../../utils/emitToast';

import { TMimeType } from '../../../../@types/S3';

interface MutationProps {
  id: string;
  file: File | null;
  removeImage: boolean;
}

export function useMutateUpdateBookImage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ id, file, removeImage }: MutationProps) => {
      let key: string | undefined;

      if (file) {
        const data = await BooksService.getPreSignedURL({
          mimeType: file.type as TMimeType,
          fileSize: file.size,
        });

        key = data.key;

        await S3Service.uploadImageS3({ preSignedURL: data.url, file });
      }

      return await BooksService.updateImage({
        id,
        imagePath: key ?? null,
        removeImage,
      });
    },
    onSuccess: (_, { id, file }) => {
      queryClient.invalidateQueries({
        queryKey: ['book', { id }],
      });

      if (file) {
        emitToast({ type: 'success', message: 'Capa alterada com sucesso.' });
      } else {
        emitToast({ type: 'success', message: 'Capa excluída com sucesso.' });
      }
    },
  });

  return {
    submitBookImage: mutateAsync,
    isUpdatingBookImage: isPending,
  };
}
