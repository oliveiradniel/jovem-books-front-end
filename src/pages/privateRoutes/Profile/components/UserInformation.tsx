import { useQueryListBooks } from '../../../../app/hooks/queries/book/useQueryListBooks';

interface UserInformationProps {
  firstName: string | null;
  lastName: string | null;
  isUpdatingUser: boolean;
  isRefetchingUser: boolean;
  isLoadingUser: boolean;
}

export default function UserInformation({
  firstName,
  lastName,
  isUpdatingUser,
  isRefetchingUser,
  isLoadingUser,
}: UserInformationProps) {
  const { booksList, isLoadingBooks, isRefetchingBooks } = useQueryListBooks();

  const totalBooks = booksList.length;
  let totalOfBooksFinished = 0;
  booksList.forEach((book) => {
    if (book.read?.status === 'FINISHED') {
      totalOfBooksFinished += 1;
    }
  });

  return (
    <div className="hidden flex-1 flex-col sm:flex">
      <p
        className={`font-quicksand text-sky-blue text-end text-[14px] font-semibold transition-opacity duration-300 ease-in-out ${!isUpdatingUser && !isLoadingUser && isRefetchingUser && 'opacity-40'}`}
      >
        {!isLoadingUser ? `${firstName} ${lastName}` : 'Carregando...'}
      </p>
      <p
        className={`font-quicksand text-light-gray mt-2 text-end text-[12px] transition-opacity duration-300 ease-in-out ${!isLoadingBooks && isRefetchingBooks && 'opacity-40'}`}
      >
        <span className="hidden sm:inline-flex">
          Total de livros cadastrados: {isLoadingBooks ? '...' : totalBooks}
        </span>
        <span className="inline-flex sm:hidden">
          Livros cadastrados: {isLoadingBooks ? '...' : totalBooks}
        </span>
      </p>
      <p
        className={`font-quicksand text-light-gray text-end text-[12px] transition-opacity duration-300 ease-in-out ${!isLoadingBooks && isRefetchingBooks && 'opacity-40'}`}
      >
        <span className="hidden sm:inline-flex">
          Total de livros lidos: {isLoadingBooks ? '...' : totalOfBooksFinished}
        </span>
        <span className="inline-flex sm:hidden">
          Livros lidos: {isLoadingBooks ? '...' : totalOfBooksFinished}
        </span>
      </p>
    </div>
  );
}
