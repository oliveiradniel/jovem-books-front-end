import { useCallback, useState } from 'react';
import { Field, FormError } from '../../@types/FormError';

export function useErrors() {
  const [errors, setErrors] = useState([] as FormError[]);

  const setError = useCallback(
    ({ field, message }: FormError) => {
      const errorAlreadyExists = errors.find((error) => error.field === field);

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [...prevState, { field, message }]);
    },
    [errors]
  );

  const removeError = useCallback((field: Field) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== field)
    );
  }, []);

  const getErrorMessageByFieldName = useCallback(
    (field: Field) => {
      return errors.find((error) => error.field === field)?.message;
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
