import { env } from '../../../../config/env';

import SkeletonLoading from '../../../../components/SkeletonLoading';

import { MdOutlinePermMedia } from 'react-icons/md';

interface BookCoverProps {
  imagePath: string | null;
  isLoadingBook: boolean;
}

export default function BookCover({
  imagePath,
  isLoadingBook,
}: BookCoverProps) {
  const src = `${env.API_URL}/uploads/books/${imagePath}`;

  return (
    <div className="hidden max-w-[240px] min-w-[240px] items-center justify-center lg:flex">
      {imagePath ? (
        <img
          src={src}
          alt="Capa do Livro"
          className="animate-fade-in h-auto w-[100%]"
        />
      ) : (
        <div className="border-navy-blue animate-fade-in relative flex h-full w-full items-center justify-center rounded-lg border">
          {!isLoadingBook ? (
            <MdOutlinePermMedia size={160} color="#19243a" />
          ) : (
            <SkeletonLoading />
          )}
        </div>
      )}
    </div>
  );
}
