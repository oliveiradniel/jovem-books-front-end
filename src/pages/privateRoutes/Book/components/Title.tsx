interface TitleProps {
  title: string;
  isLoadingBook: boolean;
  isRefetchingBook: boolean;
}

export default function Title({
  title,
  isLoadingBook,
  isRefetchingBook,
}: TitleProps) {
  return (
    <h1
      className={`text-sky-blue font-roboto text-3xl font-thin transition-opacity duration-300 ease-in-out ${!isLoadingBook && isRefetchingBook && 'opacity-70'}`}
    >
      {isLoadingBook ? 'Carregando...' : title}
    </h1>
  );
}
