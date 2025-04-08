interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="title" className="text-snow-white font-quicksand w-16">
        {label}
      </label>
      <input
        type="text"
        {...props}
        className="text-sky-blue/80 font-quicksand focus:border-sky-blue/40 border-navy-blue placeholder:text-light-gray h-8 w-full rounded-lg border px-2 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
      />
    </div>
  );
}
