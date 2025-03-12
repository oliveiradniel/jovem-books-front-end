interface ButtonPageProps {
  label: string;
}

export default function ButtonPage({ label }: ButtonPageProps) {
  return (
    <button
      type="submit"
      className="bg-dark-violet h-13 rounded-lg text-snow-white font-roboto hover:bg-dark-violet-op-60 hover:cursor-pointer transition-colors duration-300 ease-in-out focus:bg-dark-violet mt-40 absolute w-full bottom-0"
    >
      {label}
    </button>
  );
}
