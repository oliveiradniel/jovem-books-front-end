interface FormGroupProps {
  error: string[] | null;
  children: React.ReactNode;
  warningText?: string | null;
}

export default function FormGroup({
  error,
  children,
  warningText = null,
}: FormGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {warningText && (
        <span className="font-quicksand text-light-gray text-xs">
          {warningText}
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
