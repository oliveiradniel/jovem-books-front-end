import { RingLoader } from 'react-spinners';

import { IoLogoDropbox } from 'react-icons/io';

import { IBookAPI } from '../../../../@types/Book';
import { TSelected } from './RadioButtons';
import { MdError } from 'react-icons/md';

interface CardsContainerProps {
  books: IBookAPI[];
  searchTerm: string;
  selected: TSelected;
  noBookFound: boolean;
  isLoadingBooks: boolean;
  isError: boolean;
  children: React.ReactNode;
}

export default function CardsContainer({
  books,
  searchTerm,
  selected,
  noBookFound,
  isLoadingBooks,
  isError,
  children,
}: CardsContainerProps) {
  const warningText =
    selected === 'title'
      ? 'Não foi possível procurar na Google Books pelo livro de título '
      : 'Não foi possível procurar na Google Books pelo autor de nome ';

  const notFoundBookText =
    selected === 'title'
      ? 'Não foi possível encontrar o livro de títutlo '
      : 'Não foi possível encontrar o livro com o autor ';

  return (
    <div
      className={`mt-6 flex max-h-[500px] min-h-[500px] flex-wrap gap-4 overflow-y-auto px-5 ${isLoadingBooks || books.length === 0 ? 'items-center justify-center' : 'justify-center sm:justify-start'}`}
    >
      {isLoadingBooks ? (
        <RingLoader color="#03a9f4" />
      ) : (
        books.length > 0 && children
      )}

      {books.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-6">
          {!isError && !isLoadingBooks && noBookFound && (
            <p className="font-quicksand text-snow-white/80 text-center text-sm">
              {notFoundBookText}
              <span className="text-sky-blue">{searchTerm}.</span>
            </p>
          )}

          {isError ? (
            <>
              <MdError size={100} className="text-sky-blue/40" />

              <p className="font-quicksand text-snow-white/80 text-center text-sm">
                {warningText}
                <span className="font-quicksand text-blood-red font-semibold">
                  "{searchTerm}".
                </span>
              </p>
            </>
          ) : (
            !isLoadingBooks &&
            !noBookFound && (
              <>
                <p className="font-quicksand text-snow-white/80 text-center text-sm">
                  Aqui você pode se guiar mais facilmente pegando dados de
                  livros da
                  <span className="text-sky-blue"> Google Books</span> para
                  cadastrar e iniciar sua leitura!
                </p>

                <IoLogoDropbox color="#ffffff90" size={100} />
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}
