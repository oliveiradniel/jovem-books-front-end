import EmptyBox from '../../../../assets/images/empty-box.svg?react';

import { RingLoader } from 'react-spinners';

interface SinopseProps {
  text: string | null;
  isLoadingBook: boolean;
}
console.log(EmptyBox);
export default function Sinopse({ text, isLoadingBook }: SinopseProps) {
  return (
    <div className="mt-8 h-[200px] w-full overflow-y-auto lg:flex">
      {isLoadingBook && (
        <div className="flex h-full w-full items-center justify-center">
          <RingLoader color="#03a9f4" />
        </div>
      )}

      {!isLoadingBook &&
        (text ? (
          <p className="text-snow-white-op-70 font-quicksand break-words">
            {text}
          </p>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <p className="text-mate-gray/60 font-quicksand text-sm">
              Não há sinopse disponível sobre o livro. Clique no botão{' '}
              <span className="text-sky-blue/80 font-roboto">
                Editar livro{' '}
              </span>
              no canto superior direito para editar as informações sobre livro.
            </p>
          </div>
        ))}
    </div>
  );
}
