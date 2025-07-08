import SkeletonLoading from '../../../../components/SkeletonLoading';

interface SinopseProps {
  text: string | null;
  isLoadingBook: boolean;
  isRefetchingBook: boolean;
}

export default function Sinopse({
  text,
  isLoadingBook,
  isRefetchingBook,
}: SinopseProps) {
  return (
    <div className="relative mt-8 h-[200px] w-full overflow-y-auto lg:flex">
      {isLoadingBook && <SkeletonLoading rounded="lg" />}

      {!isLoadingBook &&
        (text ? (
          <p
            className={`font-quicksand break-all text-white/70 ${!isLoadingBook && isRefetchingBook && 'opacity-60'}`}
          >
            {text}
          </p>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <p
              className={`text-mate-gray/60 font-quicksand text-sm ${isRefetchingBook && 'opacity-70'}`}
            >
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
