import { useCallback, useState } from 'react';

import { IFormError } from '../../@types/FormError';

export function useErrors<T, K>() {
  const [errors, setErrors] = useState([] as IFormError<T, K>[]);

  const setError = useCallback(
    ({ field, message }: IFormError<T, K>) => {
      const errorAlreadyExists = errors.find((error) => error.field === field);

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [...prevState, { field, message }]);
    },
    [errors]
  );

  const removeError = useCallback((field: T) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== field)
    );
  }, []);

  const getErrorMessageByFieldName = useCallback(
    (field: T[]) => {
      const error = errors
        .filter((error) => field.includes(error.field))
        .map((error) => error.message);

      if (error) return error;
      return null;
    },
    [errors]
  );

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
