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
      className={`font-roboto bg-navy-blue animate-move-in-bottom-d300-y30 absolute mt-12 flex w-[170px] flex-col gap-1 rounded-lg p-1 ${!isOptionsVisible && 'animate-return-to-top-d200-y50'}`}
    >
      <Button
        numberOfItems={23}
        label="Todos os livros"
        currentPage={page}
        page="ALL"
        onClick={() => onSelect('ALL')}
      />

      <Button
        numberOfItems={2}
        label="Não lidos"
        currentPage={page}
        page="NOT_READING"
        onClick={() => onSelect('NOT_READING')}
      />

      <Button
        numberOfItems={20}
        label="Em leitura"
        currentPage={page}
        page="READING"
        onClick={() => onSelect('READING')}
      />

      <Button
        numberOfItems={9}
        label="Concluídos"
        currentPage={page}
        page="FINISHED"
        onClick={() => onSelect('FINISHED')}
      />
    </div>
  );
}
