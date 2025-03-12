interface ButtonPageProps {
  label: string;
}

export default function ButtonPage({ label }: ButtonPageProps) {
  return (
    <button
      type="submit"
      className="bg-dark-violet text-snow-white font-roboto hover:bg-dark-violet-op-60 focus:bg-dark-violet absolute bottom-0 mt-40 h-13 w-full rounded-lg transition-colors duration-300 ease-in-out hover:cursor-pointer"
    >
      {label}
    </button>
  );
}
