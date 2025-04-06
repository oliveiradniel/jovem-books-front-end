interface AuthorProps {
  author: string;
  isLoadingBook: boolean;
}

export default function Author({ author, isLoadingBook }: AuthorProps) {
  return (
    <h6 className="text-ocean-blue font-roboto mt-2 font-semibold">
      <span className="text-snow-white font-thin">Escrito por</span>{' '}
      {isLoadingBook ? '...' : author}
    </h6>
  );
}
