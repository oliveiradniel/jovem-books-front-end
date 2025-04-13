import { useState } from 'react';

interface CardProps {
  buttonLabel: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export default function Card({ Icon, buttonLabel }: CardProps) {
  const [isTheMouseOverTheButton, setIsTheMouseOverTheButton] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsTheMouseOverTheButton(true)}
      onMouseLeave={() => setIsTheMouseOverTheButton(false)}
      className={`relative flex h-[300px] w-[180px] flex-col items-center justify-center rounded-lg border transition-colors duration-300 ease-in-out hover:cursor-pointer ${isTheMouseOverTheButton ? 'animate-increase-in-102 border-sky-blue/60' : 'animate-decrease-in-102 border-sky-blue/20'} `}
    >
      <Icon
        width={80}
        fill={isTheMouseOverTheButton ? '#03a9f490' : '#03a9f470'}
        className="transition-colors duration-300 ease-in-out"
      />

      <div
        className={`absolute bottom-0 flex w-full flex-col items-center rounded-b-lg py-2 ${isTheMouseOverTheButton ? 'bg-sky-blue/60' : 'bg-sky-blue/40'}`}
      >
        <span
          className={`font-roboto font-semibold transition-colors duration-300 ease-in-out ${isTheMouseOverTheButton ? 'text-snow-white' : 'text-sky-blue'}`}
        >
          {buttonLabel}
        </span>
      </div>
    </button>
  );
}
