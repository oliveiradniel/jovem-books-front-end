import { HiOutlinePlus } from 'react-icons/hi';

interface SinopseProps {
  text: string | null;
}

export default function Sinopse({ text }: SinopseProps) {
  return (
    <div className="h-[200px]">
      {text ? (
        <p className="text-snow-white-op-70 font-quicksand mt-8">{text}</p>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <p className="text-mate-gray font-quicksand text-sm">
            Não há sinopse/descrição sobre o livro. Adicione clicando no botão
            abaixo
          </p>

          <button className="border-sky-blue flex w-full justify-center rounded-sm border py-4 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-70">
            <HiOutlinePlus size={40} color="#03a9f4" />
          </button>
        </div>
      )}
    </div>
  );
}
