interface LabelProps {
  label: string;
}

export default function Label({ label }: LabelProps) {
  const smallLabels = ['Título', 'Autor(es)', 'Sinopse'];

  return (
    <label
      htmlFor="sinopse"
      className={`font-quicksand w-[100%] text-white sm:${smallLabels.includes(label) ? 'min-w-22' : 'w-[260px]'}`}
    >
      {label}
    </label>
  );
}
