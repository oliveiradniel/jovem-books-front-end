interface ButtonProps {
  numberOfItems: number;
  label: string;
}

export default function Button({ numberOfItems, label }: ButtonProps) {
  return (
    <button type="button" className="flex items-center gap-1 p-2">
      <span className="text-sky-blue font-quicksand text-sm">{label}</span>
      <div className="bg-navy-blue-op-80 text-sky-blue rounded-sm p-1 text-xs">
        <span className="font-roboto">({numberOfItems})</span>
      </div>
    </button>
  );
}
