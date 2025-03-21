import { truncateString } from '../../utils/truncateString';

import { books } from '../../assets/mocks/books';

import { IoBookSharp } from 'react-icons/io5';

import { BOOK_LITERARY_GENRE, READING_STATUS } from '../../constants/books';

export default function MyBooks() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-quicksand text-snow-white text-2xl">Meus Livros</h1>
        <p className="font-quicksand text-snow-white text-xl font-bold">
          Bom dia!
        </p>
      </div>

      <div className="bg-blue-black-op-80 mt-3 p-5">
        <div className="flex justify-between">
          <div className="font-roboto flex">
            <button
              type="button"
              className="text-sky-blue flex items-center gap-1"
            >
              <IoBookSharp />
              <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                (23)
              </div>
            </button>

            <button
              type="button"
              className="text-sky-blue flex items-center gap-1"
            >
              <span>Não lidos</span>
              <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                (4)
              </div>
            </button>

            <button
              type="button"
              className="text-sky-blue flex items-center gap-1"
            >
              <span>Em leitura</span>
              <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                (2)
              </div>
            </button>

            <button
              type="button"
              className="text-sky-blue flex items-center gap-1"
            >
              <span>Concluídos</span>
              <div className="bg-navy-blue-op-80 rounded-sm p-1 text-xs">
                (9)
              </div>
            </button>
          </div>

          <span className="text-mate-gray">Total encontrado (10)</span>
        </div>

        <div className="bg-light-gray-op-40 mt-4 mb-4 h-[0.1px] w-full" />

        <div className="bg-navy-blue-op-80 text-mate-gray font-roboto flex justify-around rounded-lg p-2 font-bold">
          <span>Título</span>
          <span>Autores(as)</span>
          <span>Gênero Literário</span>
          <span>Status</span>
        </div>

        <div className="h-[490px] overflow-auto">
          {books.map((book) => (
            <div
              key={book.id}
              className="text-mate-gray font-roboto flex justify-around border-b p-2 text-sm last:border-0"
            >
              <span className="w-20">{truncateString(book.title, 9)}</span>
              <span className="w-20 whitespace-nowrap">
                {truncateString(book.author, 9)}
              </span>
              <span className="w-20">
                {BOOK_LITERARY_GENRE[book.genreLiterary] || '-'}
              </span>
              <span
                className={`rounded-sm p-1 ${book.status === 'NOT_READING' && 'bg-blue-black'} ${book.status === 'READING' && 'bg-ocean-blue'} ${book.status === 'READING' && 'bg-blue-black'} ${book.status === 'FINISHED' && 'bg-sky-blue'} `}
              >
                {READING_STATUS[book.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
