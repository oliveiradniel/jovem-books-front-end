import useAnimatedUnmount from '../../../../../app/hooks/useAnimatedUnmount.ts';

import { Page } from '../../@types/Page';

import Button from './Button';

interface OptionsProps {
  page: Page;
  isOptionsVisible: boolean;
  onSelect: (page: Page) => void;
}

export default function Options({
  page,
  isOptionsVisible,
  onSelect,
}: OptionsProps) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isOptionsVisible);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={animatedElementRef}
      id="options"
      className={`font-roboto bg-navy-blue animate-move-in-bottom-d300-y30 absolute mt-12 flex w-[140px] flex-col gap-1 rounded-lg p-1 ${!isOptionsVisible && 'animate-return-to-top-d200-y50'}`}
    >
      <Button
        label="Todos os livros"
        currentPage={page}
        page="ALL"
        onClick={() => onSelect('ALL')}
      />

      <Button
        label="Não lidos"
        currentPage={page}
        page="NOT_READING"
        onClick={() => onSelect('NOT_READING')}
      />

      <Button
        label="Em leitura"
        currentPage={page}
        page="READING"
        onClick={() => onSelect('READING')}
      />

      <Button
        label="Concluídos"
        currentPage={page}
        page="FINISHED"
        onClick={() => onSelect('FINISHED')}
      />
    </div>
  );
}
