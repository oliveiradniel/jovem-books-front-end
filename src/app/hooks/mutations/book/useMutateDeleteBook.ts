import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import BooksService from '../../../services/BooksService';

import { emitToast } from '../../../../utils/emitToast';

interface UseMutateDeletBookProps {
  title: string;
  onCloseModal: () => void;
}

export function useMutateDeleteBook({
  title,
  onCloseModal,
}: UseMutateDeletBookProps) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await BooksService.deleteBook(id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });

      onCloseModal();

      emitToast({
        type: 'success',
        message: `O livro ${title} foi excluído com sucesso.`,
      });

      navigate('/my-books');
    },
    onError: () => {
      emitToast({
        type: 'error',
        message: `Não foi possível excluir o livro ${title}.`,
      });
    },
  });

  return {
    deleteBook: mutate,
    isDeleting: isPending,
  };
}
