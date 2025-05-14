import { useMutation } from '@tanstack/react-query';

import { ISessionFormProps } from '../../../pages/nonPrivateRoutes/components/SessionForm';

import { TSignIn, TSignUp } from '../../../@types/User';

import {
  IFormError,
  TSessionErrorMessages,
  TSessionFields,
} from '../../../@types/FormError';

export function useMutateSession<T>({
  validationSchema,
  onSubmit,
}: ISessionFormProps<T> & {
  setError: ({
    field,
    message,
  }: IFormError<TSessionFields, TSessionErrorMessages>) => void;
}) {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (data: TSignIn | TSignUp) => {
      const credentials = validationSchema.parse(data);

      await onSubmit(credentials);
    },
  });

  return {
    submitSession: mutateAsync,
    isLoading: isPending,
    hasError: isError,
  };
}
