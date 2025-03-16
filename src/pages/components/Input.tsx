import { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { ErrorData } from '../types/ErrorData';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theFieldIsEmpty: boolean;
  Icon: React.ElementType;
  errorsData: ErrorData[];
  fieldName: 'username' | 'firstName' | 'lastName' | 'email' | 'password';
  isDisabled: boolean;
  isAPasswordInput?: boolean;
}

export default function Input({
  theFieldIsEmpty,
  Icon,
  errorsData,
  fieldName,
  isDisabled,
  isAPasswordInput = false,
  ...props
}: InputProps) {
  const [isTheFieldFocused, setIsTheFieldFocused] = useState(false);

  const [isThePasswordVisible, setIsThePasswordVisible] = useState(false);

  const typeField =
    isAPasswordInput && isThePasswordVisible ? 'text' : 'password';

  const errors = errorsData.filter((error) => {
    return fieldName.includes(error.fieldName);
  });

  const isError = errors.some((error) => error.fieldName === fieldName);

  function handlePasswordVisibility() {
    setIsThePasswordVisible((prevState) => !prevState);
    setIsTheFieldFocused(true);
  }

  return (
    <div
      className={`bg-midnight-blue-op-40 border-midnight-blue-op-40 flex items-center gap-3 rounded-lg border px-4 py-2 transition-all duration-300 ease-in-out ${
        isTheFieldFocused && 'border-royal-purple'
      } ${isDisabled && 'bg-transparent'} ${isError && 'border-blood-red!'}`}
    >
      <Icon
        className={`text-light-gray-op-40 h-5 w-5 transition duration-300 ease-in-out ${
          (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
        } ${isError && 'text-blood-red!'}`}
      />

      <input
        type={typeField}
        onFocus={() => setIsTheFieldFocused(true)}
        onBlur={() => setIsTheFieldFocused(false)}
        {...props}
        className={`placeholder:text-light-gray-op-70 text-snow-white w-full focus:outline-none ${isError && 'text-blood-red!'}`}
      />

      {isAPasswordInput && (
        <button
          type="button"
          disabled={isDisabled}
          onClick={handlePasswordVisibility}
          onBlur={() => {
            setIsTheFieldFocused(false);
          }}
          className={
            isDisabled ? 'hover:cursor-default' : 'hover:cursor-pointer'
          }
        >
          {!isThePasswordVisible ? (
            <FaEye
              className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
              } ${isError && 'text-blood-red!'}`}
            />
          ) : (
            <FaEyeSlash
              className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
              } ${isError && 'text-blood-red!'}`}
            />
          )}
        </button>
      )}
    </div>
  );
}
