interface BookCoverProps {
  imagePath: string | null;
}

export default function BookCover({ imagePath }: BookCoverProps) {
  return (
    <div className="hidden max-w-[240px] min-w-[240px] items-center justify-center lg:flex">
      <img src={imagePath} alt="Capa do Livro" className="h-auto w-[100%]" />
    </div>
  );
}
