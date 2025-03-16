import { ErrorData, FieldName } from '../pages/types/ErrorData';

interface FormGroupProps {
  children: React.ReactNode;
  fieldName: FieldName[];
  errorsData: ErrorData[];
}

export default function FormGroup({
  children,
  fieldName,
  errorsData,
}: FormGroupProps) {
  const errors = errorsData.filter((error) => {
    return fieldName.includes(error.fieldName!);
  });

  const errorMessages = errors.map((error) => error.message);

  return (
    <div>
      {children}
      {errorMessages.map((error) => (
        <small
          key={Math.random()}
          className="font-roboto text-blood-red mt-2 flex"
        >
          {error}
        </small>
      ))}
    </div>
  );
}
