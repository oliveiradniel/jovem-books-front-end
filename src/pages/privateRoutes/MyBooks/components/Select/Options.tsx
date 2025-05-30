import { TBookFilter } from '../../../../../@types/Book.ts';
import useAnimatedUnmount from '../../../../../app/hooks/useAnimatedUnmount.ts';

import Button from './Button';

interface OptionsProps {
  selectedFilter: TBookFilter;
  isVisible: boolean;
  onSelect: (selectedFilter: TBookFilter) => void;
}

export default function Options({
  selectedFilter,
  isVisible,
  onSelect,
}: OptionsProps) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={animatedElementRef}
      id="options"
      className={`font-roboto bg-navy-blue animate-move-in-bottom-d300-y30 absolute mt-12 flex w-[140px] flex-col gap-1 rounded-lg p-1 ${!isVisible && 'animate-return-to-top-d200-y50'}`}
    >
      <Button
        label="Todos os livros"
        isSelected={selectedFilter === 'ALL'}
        onClick={() => onSelect('ALL')}
      />

      <Button
        label="Não lidos"
        isSelected={selectedFilter === 'NOT_READING'}
        onClick={() => onSelect('NOT_READING')}
      />

      <Button
        label="Em leitura"
        isSelected={selectedFilter === 'READING'}
        onClick={() => onSelect('READING')}
      />

      <Button
        label="Em pausa"
        isSelected={selectedFilter === 'ON_HOLD'}
        onClick={() => onSelect('ON_HOLD')}
      />

      <Button
        label="Concluídos"
        isSelected={selectedFilter === 'FINISHED'}
        onClick={() => onSelect('FINISHED')}
      />
    </div>
  );
}
