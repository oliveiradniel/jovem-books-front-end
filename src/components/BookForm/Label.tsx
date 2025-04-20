interface LabelProps {
  label: string;
}

export default function Label({ label }: LabelProps) {
  return (
    <label
      htmlFor="sinopse"
      className={`text-snow-white font-quicksand ${label === 'Número de Páginas' ? 'w-[260px]' : 'min-w-22'}`}
    >
      {label}
    </label>
  );
}
