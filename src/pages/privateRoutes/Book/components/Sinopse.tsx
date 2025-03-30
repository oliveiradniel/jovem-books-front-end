interface SinopseProps {
  text: string | null;
}

export default function Sinopse({ text }: SinopseProps) {
  return <p className="text-snow-white-op-70 font-quicksand mt-8">{text}</p>;
}
