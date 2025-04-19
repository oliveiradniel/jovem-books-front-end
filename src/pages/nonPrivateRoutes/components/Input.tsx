import { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string[] | null;
  theFieldIsEmpty: boolean;
  Icon: React.ElementType;
  isDisabled: boolean;
  isAPasswordInput?: boolean;
}

export default function Input({
  error,
  theFieldIsEmpty,
  Icon,
  isDisabled,
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
      className={`bg-midnight-blue-op-40 border-midnight-blue-op-40 flex items-center gap-3 rounded-lg border px-4 py-2 transition-all duration-300 ease-in-out ${
        isTheFieldFocused && 'border-royal-purple'
      } ${isDisabled && 'bg-transparent'} ${error && error.length > 0 && 'border-blood-red!'}`}
    >
      <Icon
        className={`text-light-gray-op-40 h-5 w-5 transition duration-300 ease-in-out ${
          (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
        } ${error && error.length > 0 && 'text-blood-red!'}`}
      />

      <input
        type={typeField}
        onFocus={() => setIsTheFieldFocused(true)}
        onBlur={() => setIsTheFieldFocused(false)}
        {...props}
        className={`placeholder:text-light-gray-op-70 text-snow-white w-full focus:outline-none ${error && error.length > 0 && 'text-blood-red!'}`}
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
              } ${error && error.length > 0 && 'text-blood-red!'}`}
            />
          ) : (
            <FaEyeSlash
              className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
              } ${error && error.length > 0 && 'text-blood-red!'}`}
            />
          )}
        </button>
      )}
    </div>
  );
}
