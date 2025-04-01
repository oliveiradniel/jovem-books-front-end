import { Page } from '../../@types/Page';
import Button from './Button';

interface LargeOptionsMenuProps {
  page: Page;
  disabled: boolean;
  onChange: (page: Page) => void;
}

export default function LargeOptionsMenu({
  page,
  disabled,
  onChange,
}: LargeOptionsMenuProps) {
  return (
    <div className="flex gap-4">
      <Button
        label="Todos os livros"
        page={page}
        buttonPage="ALL"
        disabled={disabled}
        onClick={() => onChange('ALL')}
      />

      <Button
        label="Não lidos"
        page={page}
        buttonPage="NOT_READING"
        disabled={disabled}
        onClick={() => onChange('NOT_READING')}
      />

      <Button
        label="Em leitura"
        page={page}
        buttonPage="READING"
        disabled={disabled}
        onClick={() => onChange('READING')}
      />

      <Button
        label="Concluídos"
        page={page}
        buttonPage="FINISHED"
        disabled={disabled}
        onClick={() => onChange('FINISHED')}
      />
    </div>
  );
}
