interface ButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function Button({ label, isSelected, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-light-gray hover:bg-blue-black-op-80 flex items-center rounded-lg p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${isSelected && 'text-sky-blue hover:bg-navy-blue hover:cursor-default!'}`}
    >
      <p className="font-quicksand text-sm">{label}</p>
    </button>
  );
}
