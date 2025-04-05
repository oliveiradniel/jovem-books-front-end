import { env } from '../../../../config/env';

import { GiBookCover } from 'react-icons/gi';

interface BookCoverProps {
  imagePath: string | null;
}

export default function BookCover({ imagePath }: BookCoverProps) {
  const src = `${env.API_URL}/uploads/books/${imagePath}`;

  return (
    <div className="hidden max-w-[240px] min-w-[240px] items-center justify-center lg:flex">
      {imagePath ? (
        <img src={src} alt="Capa do Livro" className="h-auto w-[100%]" />
      ) : (
        <div className="border-sky-blue flex h-full w-full items-center justify-center rounded-lg border">
          <GiBookCover size={160} color="#03a9f4 " />
        </div>
      )}
    </div>
  );
}
