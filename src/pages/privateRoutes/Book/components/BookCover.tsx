import { env } from '../../../../config/env';

import SkeletonLoading from '../../../../components/SkeletonLoading';

import { MdOutlinePermMedia } from 'react-icons/md';

interface BookCoverProps {
  imagePath: string | null;
  isLoadingBook: boolean;
  isRefetchingBook: boolean;
}

export default function BookCover({
  imagePath,
  isLoadingBook,
  isRefetchingBook,
}: BookCoverProps) {
  const src = `${env.VITE_AWS_BUCKET_URL}/${imagePath}`;

  return (
    <div className="hidden h-[340px] max-w-[240px] min-w-[240px] items-center justify-center lg:flex">
      {imagePath ? (
        <img
          src={src}
          alt="Capa do Livro"
          className={`animate-fade-in h-full w-full object-contain transition-opacity duration-300 ease-in-out ${
            isRefetchingBook && 'opacity-40'
          }`}
        />
      ) : (
        <div className="border-navy-blue animate-fade-in relative flex h-full w-full items-center justify-center rounded-lg border">
          {isLoadingBook || isRefetchingBook ? (
            <SkeletonLoading />
          ) : (
            <MdOutlinePermMedia size={160} color="#19243a" />
          )}
        </div>
      )}
    </div>
  );
}
