import Spinner from '../../../../components/Spinner';

export default function LoadingMessage() {
  return (
    <div className="animate-fade-in flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
      <Spinner />
      <p className="text-light-gray text-[1rem]">
        Buscando livros na Google Books...
      </p>
    </div>
  );
}
