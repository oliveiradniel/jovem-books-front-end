interface FormGroupProps {
  children: React.ReactNode;
  error: string;
}

export default function FormGroup({ children, error }: FormGroupProps) {
  return (
    <div>
      {children}
      {error && (
        <small className="font-roboto text-blood-red mt-2 flex">{error}</small>
      )}
    </div>
  );
}
