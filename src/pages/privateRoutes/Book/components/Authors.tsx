interface AuthorsProps {
  authors: string[];
  isLoadingBook: boolean;
  isRefetchingBook: boolean;
}

export default function Authors({
  authors,
  isLoadingBook,
  isRefetchingBook,
}: AuthorsProps) {
  function renderAuthors() {
    return authors?.map((author, index) => {
      const isLast = index === authors.length - 1;
      const isSecondLast = index === authors.length - 2;

      return (
        <span key={index} className="text-sky-blue/70 break-words">
          {author}

          {isSecondLast && !isLast && (
            <span className="font-thin text-white"> e </span>
          )}

          {!isLast && !isSecondLast && (
            <span className="font-thin text-white">, </span>
          )}

          {isLast && !isLoadingBook && isRefetchingBook && '...'}
        </span>
      );
    });
  }

  return (
    <h6 className="text-sky-blue/70 mt-2">
      <span className="font-thin text-white">Escrito por</span>{' '}
      {isLoadingBook ? '...' : renderAuthors()}
    </h6>
  );
}
