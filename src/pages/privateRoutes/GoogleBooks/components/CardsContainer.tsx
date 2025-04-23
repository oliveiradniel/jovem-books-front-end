import { RingLoader } from 'react-spinners';

import { IBookAPI } from '../../../../@types/Book';
import { IoLogoDropbox } from 'react-icons/io';

interface CardsContainerProps {
  books: IBookAPI[];
  isLoadingBooks: boolean;
  children: React.ReactNode;
}

export default function CardsContainer({
  books,
  isLoadingBooks,
  children,
}: CardsContainerProps) {
  return (
    <div
      className={`mt-6 flex max-h-[500px] min-h-[500px] flex-wrap gap-4 overflow-y-auto px-5 ${isLoadingBooks || books.length === 0 ? 'items-center justify-center' : 'justify-center sm:justify-start'}`}
    >
      {isLoadingBooks ? <RingLoader color="#03a9f4" /> : children}

      {!isLoadingBooks && books.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="font-quicksand text-snow-white/80 text-center text-sm">
            Aqui você pode se guiar mais facilmente pegando dados de livros da
            <span className="text-sky-blue"> Google Books</span> para cadastrar
            e iniciar sua leitura!
          </p>

          <IoLogoDropbox color="#ffffff90" size={100} />
        </div>
      )}
    </div>
  );
}
