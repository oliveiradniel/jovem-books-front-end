import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  buttonLabel: string;
  to: '/new-book' | '/new-collection';
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
}

export default function Card({
  buttonLabel,
  to,
  Icon,
  disabled = false,
}: CardProps) {
  const [isTheMouseOverTheButton, setIsTheMouseOverTheButton] = useState(false);

  return (
    <Link
      to={to}
      type="button"
      onClick={(event) => disabled && event.preventDefault()}
      onMouseEnter={() => !disabled && setIsTheMouseOverTheButton(true)}
      onMouseLeave={() => !disabled && setIsTheMouseOverTheButton(false)}
      className={`relative flex h-[300px] w-[180px] flex-col items-center justify-center rounded-lg border transition-colors duration-300 ease-in-out ${isTheMouseOverTheButton ? 'animate-increase-in-102 border-sky-blue/60' : 'animate-decrease-in-102 border-sky-blue/20'} ${disabled ? 'border-light-gray/40! cursor-default' : 'cursor-pointer'}`}
    >
      <Icon
        width={80}
        fill={
          disabled
            ? '#adadad40'
            : isTheMouseOverTheButton
              ? '#03a9f490'
              : '#03a9f470'
        }
        className="transition-colors duration-300 ease-in-out"
      />

      <div
        className={`absolute bottom-0 flex w-full flex-col items-center rounded-b-lg py-2 ${isTheMouseOverTheButton ? 'bg-sky-blue/60' : 'bg-sky-blue/40'} ${disabled && 'bg-light-gray/40!'}`}
      >
        <span
          className={`font-roboto font-semibold transition-colors duration-300 ease-in-out ${isTheMouseOverTheButton ? 'text-snow-white' : 'text-sky-blue'} ${disabled && 'text-light-gray! line-through'}`}
        >
          {buttonLabel}
        </span>
      </div>
    </Link>
  );
}
