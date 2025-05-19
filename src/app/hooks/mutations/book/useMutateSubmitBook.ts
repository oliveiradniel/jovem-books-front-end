import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TUpdateBook } from '../../../../@types/Book';

interface UseMutationSubmitBookProps<T> {
  type: 'create' | 'update';
  onSubmit: (data: T) => Promise<void>;
}

export function useMutateSubmitBook<T>({
  type,
  onSubmit,
}: UseMutationSubmitBookProps<T>) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (variables: T) => {
      await onSubmit(variables);
    },
    onSuccess: (_, variables) => {
      if (type === 'update') {
        const { id } = variables as TUpdateBook;

        queryClient.invalidateQueries({
          queryKey: ['book', { id }],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
  });

  return {
    submitBook: mutateAsync,
    isLoading: isPending,
    hasError: isError,
  };
}
