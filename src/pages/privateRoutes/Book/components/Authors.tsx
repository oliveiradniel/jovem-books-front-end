interface AuthorsProps {
  authors: string[]; // ["Eu e Eu", "Eu"]
  isLoadingBook: boolean;
}

export default function Authors({ authors, isLoadingBook }: AuthorsProps) {
  function renderAuthors() {
    return authors?.map((author, index) => {
      const isLast = index === authors.length - 1;
      const isSecondLast = index === authors.length - 2;

      return (
        <span key={index} className="text-sky-blue/70">
          {author}
          {isSecondLast && !isLast && (
            <span className="text-snow-white font-thin"> e </span>
          )}
          {!isLast && !isSecondLast && (
            <span className="text-snow-white font-thin">, </span>
          )}
        </span>
      );
    });
  }

  return (
    <h6 className="text-sky-blue/70 mt-2">
      <span className="text-snow-white font-thin">Escrito por</span>{' '}
      {isLoadingBook ? '...' : renderAuthors()}
    </h6>
  );
}
