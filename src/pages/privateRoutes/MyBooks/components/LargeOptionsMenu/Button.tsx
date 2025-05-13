interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isSelected: boolean;
}

export default function Button({ label, isSelected, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`disabled:text-light-gray/80 font-quicksand flex cursor-pointer items-center gap-1 p-2 text-sm transition-opacity duration-300 ease-in-out disabled:cursor-default ${isSelected ? 'text-sky-blue cursor-default!' : `text-light-gray hover:opacity-70`}`}
      {...props}
    >
      {label}
    </button>
  );
}
