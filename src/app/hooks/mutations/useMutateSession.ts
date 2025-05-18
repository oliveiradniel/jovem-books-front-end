import { useMutation } from '@tanstack/react-query';

import { emitToast } from '../../../utils/emitToast';

interface UseMutateSessionProps<T> {
  type: 'signIn' | 'signUp' | 'registrationCompleted';
  onSubmit: (credentials: T) => Promise<void>;
}

export function useMutateSession<T>({
  type,
  onSubmit,
}: UseMutateSessionProps<T>) {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (variables: T) => {
      await onSubmit(variables);
    },
    onError: () => {
      const message =
        type !== 'signUp'
          ? 'Não foi possível verificar suas credenciais.'
          : 'Não foi possível concluir seu cadastro.';

      emitToast({
        type: 'error',
        message,
      });
    },
  });

  return {
    submitSession: mutate,
    isLoading: isPending,
    hasError: isError,
  };
}
