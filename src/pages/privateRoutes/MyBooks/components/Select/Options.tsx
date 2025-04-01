import useAnimatedUnmount from '../../../../../app/hooks/useAnimatedUnmount.ts';

import { Page } from '../../@types/Page';

import Button from './Button';

interface OptionsProps {
  page: Page;
  isVisible: boolean;
  onSelect: (page: Page) => void;
}

export default function Options({ page, isVisible, onSelect }: OptionsProps) {
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
        page={page}
        buttonPage="ALL"
        onClick={() => onSelect('ALL')}
      />

      <Button
        label="Não lidos"
        page={page}
        buttonPage="NOT_READING"
        onClick={() => onSelect('NOT_READING')}
      />

      <Button
        label="Em leitura"
        page={page}
        buttonPage="READING"
        onClick={() => onSelect('READING')}
      />

      <Button
        label="Concluídos"
        page={page}
        buttonPage="FINISHED"
        onClick={() => onSelect('FINISHED')}
      />
    </div>
  );
}
