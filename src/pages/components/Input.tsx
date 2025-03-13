import { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theFieldIsEmpty: boolean;
  Icon: React.ElementType;
  isAPasswordInput?: boolean;
}

export default function Input({
  theFieldIsEmpty,
  Icon,
  isAPasswordInput = false,
  ...props
}: InputProps) {
  const [isTheFieldFocused, setIsTheFieldFocused] = useState(false);

  const [isThePasswordVisible, setIsThePasswordVisible] = useState(false);

  function handlePasswordVisibility() {
    setIsThePasswordVisible((prevState) => !prevState);
    setIsTheFieldFocused(true);
  }

  const typeField =
    isAPasswordInput && isThePasswordVisible ? 'text' : 'password';

  return (
    <div
      className={`bg-midnight-blue-op-40 border-midnight-blue-op-40 flex items-center gap-3 rounded-lg border px-4 py-2 transition duration-300 ease-in-out ${
        isTheFieldFocused && 'border-royal-purple'
      }`}
    >
      <Icon
        className={`text-light-gray-op-40 h-5 w-5 transition duration-300 ease-in-out ${
          (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
        }`}
      />

      <input
        type={typeField}
        onFocus={() => setIsTheFieldFocused(true)}
        onBlur={() => setIsTheFieldFocused(false)}
        {...props}
        className="placeholder:text-light-gray-op-70 text-snow-white w-full focus:outline-none"
      />

      {isAPasswordInput && (
        <button
          type="button"
          onClick={handlePasswordVisibility}
          onBlur={() => {
            setIsTheFieldFocused(false);
          }}
        >
          {!isThePasswordVisible ? (
            <FaEye
              className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
              }`}
            />
          ) : (
            <FaEyeSlash
              className={`text-light-gray-op-40 transition duration-300 ease-in-out ${
                (isTheFieldFocused || theFieldIsEmpty) && 'text-royal-purple'
              }`}
            />
          )}
        </button>
      )}
    </div>
  );
}
