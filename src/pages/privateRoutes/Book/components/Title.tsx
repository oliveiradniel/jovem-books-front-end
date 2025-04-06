interface TitleProps {
  title: string;
  isLoadingBook: boolean;
}

export default function Title({ title, isLoadingBook }: TitleProps) {
  return (
    <h1 className="text-sky-blue font-roboto text-3xl font-thin">
      {isLoadingBook ? 'Carregando...' : title}
    </h1>
  );
}
