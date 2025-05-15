import { useMutation, useQueryClient } from '@tanstack/react-query';

import { emitToast } from '../../../utils/emitToast';

import { IBookAPI } from '../../../@types/Book';

interface UseMutationSubmitBookProps<T> {
  type: 'Criar' | 'Salvar alterações';
  onSubmit: (data: T) => Promise<IBookAPI>;
}

export function useMutateSubmitBook<T>({
  type,
  onSubmit,
}: UseMutationSubmitBookProps<T>) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: T): Promise<IBookAPI> => {
      return await onSubmit(data);
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({
        queryKey: ['books', { id }],
      });

      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: () => {
      const errorMessage = `Não foi possível ${type === 'Criar' ? 'criar o' : 'salvar as alterações do'} livro.`;

      emitToast({ type: 'error', message: errorMessage });
    },
  });

  return {
    submitBook: mutate,
    isLoading: isPending,
    hasError: isError,
  };
}
