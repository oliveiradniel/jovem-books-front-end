import { ErrorData, FieldName } from '../@types/ErrorData';

interface FormGroupProps {
  children: React.ReactNode;
  fieldName: FieldName[];
  wariningText?: string | null;
  errorsData: ErrorData[];
}

export default function FormGroup({
  children,
  fieldName,
  wariningText = null,
  errorsData,
}: FormGroupProps) {
  const errors = errorsData.filter((error) => {
    return fieldName.includes(error.fieldName!);
  });

  const errorMessages = errors.map((error) => error.message);

  return (
    <div className="flex flex-col gap-2">
      {wariningText && (
        <span className="font-quicksand text-light-gray text-xs">
          {wariningText}
        </span>
      )}
      {children}
      {errorMessages.map((error) => (
        <small key={Math.random()} className="font-roboto text-blood-red flex">
          {error}
        </small>
      ))}
    </div>
  );
}
