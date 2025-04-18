import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  danger?: boolean;
}

export default function Input({ danger, ...props }: InputProps) {
  return (
    <input
      className={`bg-navy-blue font-quicksand placeholder:text-light-gray text-snow-white border-navy-blue-2 h-8 appearance-none rounded-[4px] border px-2 text-sm transition-colors duration-300 ease-in-out outline-none ${danger ? 'focus:border-blood-red/60' : 'focus:border-sky-blue/60'}`}
      {...props}
    />
  );
}
