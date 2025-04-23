import { RingLoader } from 'react-spinners';

interface CardsContainerProps {
  isLoadingBooks: boolean;
  children: React.ReactNode;
}

export default function CardsContainer({
  isLoadingBooks,
  children,
}: CardsContainerProps) {
  return (
    <div
      className={`mt-6 flex max-h-[500px] min-h-[500px] flex-wrap gap-4 overflow-y-auto px-5 ${isLoadingBooks ? 'items-center justify-center' : 'justify-center sm:justify-start'}`}
    >
      {isLoadingBooks ? <RingLoader color="#03a9f4" /> : children}
    </div>
  );
}
