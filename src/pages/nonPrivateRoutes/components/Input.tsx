import { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string[] | null;
  theFieldIsEmpty: boolean;
  isLoading: boolean;
  Icon: React.ElementType;
  isAPasswordInput?: boolean;
}

export default function Input({
  error,
  theFieldIsEmpty,
  isLoading,
  Icon,
  isAPasswordInput = false,
  ...props
}: InputProps) {
  const [isTheFieldFocused, setIsTheFieldFocused] = useState(false);

  const [isThePasswordVisible, setIsThePasswordVisible] = useState(false);

  const typeField =
    isAPasswordInput && isThePasswordVisible ? 'text' : 'password';

  function handlePasswordVisibility() {
    setIsThePasswordVisible((prevState) => !prevState);
    setIsTheFieldFocused(true);
  }

  return (
    <div
      className={`bg-navy-blue/60 border-navy-blue/60 flex items-center gap-3 rounded-lg border px-4 py-2 transition-all duration-300 ease-in-out ${isLoading && 'bg-transparent'} ${
        isTheFieldFocused && 'border-sky-blue'
      } ${error && error.length > 0 && 'border-blood-red!'}`}
    >
      <Icon
        className={`text-light-gray-op-40 h-5 w-5 transition duration-300 ease-in-out ${
          (isTheFieldFocused || theFieldIsEmpty) && 'text-sky-blue'
        } ${error && error.length > 0 && 'text-blood-red!'}`}
      />

      <input
        type={typeField}
        disabled={isLoading}
        onFocus={() => setIsTheFieldFocused(true)}
        onBlur={() => setIsTheFieldFocused(false)}
        {...props}
        className={`placeholder:text-light-gray-op-70 text-snow-white w-full focus:outline-none ${error && error.length > 0 && 'text-blood-red!'}`}
      />

      {isAPasswordInput && (
        <button
          type="button"
          disabled={isLoading}
          onClick={handlePasswordVisibility}
          onBlur={() => {
            setIsTheFieldFocused(false);
          }}
          className={'cursor-pointer disabled:cursor-default'}
        >
          {!isThePasswordVisible ? (
            <FaEye
              className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                (isTheFieldFocused || theFieldIsEmpty) && 'text-sky-blue'
              } ${error && error.length > 0 && 'text-blood-red!'}`}
            />
          ) : (
            <FaEyeSlash
              className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                (isTheFieldFocused || theFieldIsEmpty) && 'text-sky-blue'
              } ${error && error.length > 0 && 'text-blood-red!'}`}
            />
          )}
        </button>
      )}
    </div>
  );
}
