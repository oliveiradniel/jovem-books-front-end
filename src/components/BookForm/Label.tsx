interface LabelProps {
  label: string;
}

export default function Label({ label }: LabelProps) {
  const smallLabels = ['Título', 'Autor(es)', 'Sinopse'];

  return (
    <label
      htmlFor="sinopse"
      className={`text-snow-white font-quicksand ${smallLabels.includes(label) ? 'min-w-22' : 'w-[260px]'}`}
    >
      {label}
    </label>
  );
}
