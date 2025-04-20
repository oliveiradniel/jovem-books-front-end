import { IconType } from 'react-icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  error: boolean;
  Icon: IconType;
}

export default function Button({ error, Icon, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`flex items-center justify-center text-3xl transition-colors duration-300 ease-in-out hover:cursor-pointer ${error ? 'text-blood-red hover:text-blood-red/70' : 'text-sky-blue/70 hover:text-sky-blue/40'}`}
    >
      <Icon />
    </button>
  );
}
