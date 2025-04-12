import { ToastContentProps } from 'react-toastify';

interface ToastProps extends ToastContentProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
