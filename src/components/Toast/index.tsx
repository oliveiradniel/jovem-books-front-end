interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
