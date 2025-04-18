interface FormGroupProps {
  error: string[] | null;
  children: React.ReactNode;
  wariningText?: string | null;
}

export default function FormGroup({
  error,
  children,
  wariningText = null,
}: FormGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {wariningText && (
        <span className="font-quicksand text-light-gray text-xs">
          {wariningText}
        </span>
      )}
      {children}
      {error &&
        error.map((message) => (
          <small key={message} className="font-roboto text-blood-red flex">
            {message}
          </small>
        ))}
    </div>
  );
}
