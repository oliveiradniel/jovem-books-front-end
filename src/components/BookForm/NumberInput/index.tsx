import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import Input from '../Input';
import Button from './Button';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string[] | null;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function NumberInput({
  onIncrement,
  onDecrement,
  error,
  ...props
}: NumberInputProps) {
  const isError = error && error.length > 0;

  return (
    <div className="flex justify-between">
      <Input error={error} label="Número de Páginas" {...props} />
      <div className="ml-4 flex">
        <Button error={isError!} Icon={CiSquarePlus} onClick={onIncrement} />
        <Button error={isError!} Icon={CiSquareMinus} onClick={onDecrement} />
      </div>
    </div>
  );
}
