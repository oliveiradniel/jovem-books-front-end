import { useCallback, useState } from 'react';

import { TField, IFormError } from '../../@types/FormError';

export function useErrors() {
  const [errors, setErrors] = useState([] as IFormError[]);

  const setError = useCallback(
    ({ field, message }: IFormError) => {
      const errorAlreadyExists = errors.find((error) => error.field === field);

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [...prevState, { field, message }]);
    },
    [errors]
  );

  const removeError = useCallback((field: TField) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== field)
    );
  }, []);

  const getErrorMessageByFieldName = useCallback(
    (field: TField[]) => {
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
