interface AuthorsProps {
  authors: string;
  isLoadingBook: boolean;
}

export default function Authors({ authors, isLoadingBook }: AuthorsProps) {
  function formatColors(authorsStr: string) {
    const parts = authorsStr?.split(/(,| e )/).filter((part) => part !== '');

    return parts?.map((part, index) => {
      const isCommaOrE = part === ',' || part === ' e ';
      return (
        <span
          key={index}
          className={`font-roboto ${
            isCommaOrE ? 'text-snow-white font-thin' : 'text-sky-blue/70'
          } `}
        >
          {part}
        </span>
      );
    });
  }

  return (
    <h6 className="text-sky-blue/70 mt-2">
      <span className="text-snow-white font-thin">Escrito por</span>{' '}
      {isLoadingBook ? '...' : formatColors(authors)}
    </h6>
  );
}
