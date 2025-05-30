import Spinner from '../../../components/Spinner';

interface LoadingMessageProps {
  message: string;
}

export default function LoadingMessage({ message }: LoadingMessageProps) {
  return (
    <div className="animate-fade-in flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
      <Spinner />
      <p className="text-light-gray text-[1rem]">{message}</p>
    </div>
  );
}
