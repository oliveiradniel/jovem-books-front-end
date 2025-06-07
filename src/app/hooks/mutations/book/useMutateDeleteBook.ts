import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../useAuth';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';

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
  const { signOut } = useAuth();

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
        message: `Não foi possível excluir o livro ${title}.`,
      });
    },
  });

  return {
    deleteBook: mutate,
    isDeleting: isPending,
  };
}
