import { toast } from 'react-toastify';
import Toast from '../components/Toast';

interface EmitToastProps {
  type: 'error' | 'success';
  message: string;
}

export function emitToast({ type, message }: EmitToastProps) {
  const toastFn = {
    success: toast.success,
    error: toast.error,
  }[type];

  toastFn(
    <Toast message={message} />
    // { toastId: 'book-not-found' }
  );
}
