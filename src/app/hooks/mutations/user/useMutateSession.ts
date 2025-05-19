import { useMutation } from '@tanstack/react-query';

interface UseMutateSessionProps<T> {
  onSubmit: (credentials: T) => Promise<void>;
}

export function useMutateSession<T>({ onSubmit }: UseMutateSessionProps<T>) {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (variables: T) => {
      await onSubmit(variables);
    },
  });

  return {
    submitSession: mutateAsync,
    isLoading: isPending,
    hasError: isError,
  };
}
