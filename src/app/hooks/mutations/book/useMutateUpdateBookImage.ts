import { useMutation, useQueryClient } from '@tanstack/react-query';

import BooksService from '../../../services/BooksService';
import { emitToast } from '../../../../utils/emitToast';

interface MutationProps {
  id: string;
  image: File | null;
}

export function useMutateUpdateBookImage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ id, image }: MutationProps) => {
      const updatedBook = await BooksService.updateImage({
        id,
        image,
      });

      return updatedBook;
    },
    onSuccess: (_, { id, image }) => {
      queryClient.invalidateQueries({
        queryKey: ['book', { id }],
      });

      if (image) {
        emitToast({ type: 'success', message: 'Capa alterada com sucesso.' });
      } else {
        emitToast({ type: 'success', message: 'Capa excluída com sucesso.' });
      }
    },
    onError: (_, { image }) => {
      if (image) {
        emitToast({
          type: 'error',
          message: 'Não foi possível alterar a capa do livro.',
        });
      } else {
        emitToast({
          type: 'error',
          message: 'Não foi possível excluir a capa do livro.',
        });
      }
    },
  });

  return {
    submitBookImage: mutateAsync,
    isUpdatingBookImage: isPending,
  };
}
