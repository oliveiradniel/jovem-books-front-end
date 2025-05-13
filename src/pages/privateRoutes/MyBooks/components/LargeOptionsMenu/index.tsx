import { TBookFilter } from '../../../../../@types/Book';

import Button from './Button';

interface LargeOptionsMenuProps {
  selectedFilter: TBookFilter;
  disabled: boolean;
  onChange: (selectedFilter: TBookFilter) => void;
}

export default function LargeOptionsMenu({
  selectedFilter,
  disabled,
  onChange,
}: LargeOptionsMenuProps) {
  return (
    <div className="flex gap-4">
      <Button
        label="Todos os livros"
        isSelected={selectedFilter === 'ALL'}
        disabled={disabled}
        onClick={() => onChange('ALL')}
      />

      <Button
        label="Não lidos"
        isSelected={selectedFilter === 'NOT_READING'}
        disabled={disabled}
        onClick={() => onChange('NOT_READING')}
      />

      <Button
        label="Em leitura"
        isSelected={selectedFilter === 'READING'}
        disabled={disabled}
        onClick={() => onChange('READING')}
      />

      <Button
        label="Concluídos"
        isSelected={selectedFilter === 'FINISHED'}
        disabled={disabled}
        onClick={() => onChange('FINISHED')}
      />
    </div>
  );
}
