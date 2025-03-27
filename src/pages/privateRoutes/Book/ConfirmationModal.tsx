import { ChangeEvent, useState } from 'react';
import ReactDOM from 'react-dom';
import useAnimatedUnmount from '../../../app/hooks/useAnimatedUnmount.ts';

interface ConfirmationModal {
  bookTitle: string;
  remainingPages: number;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  remainingPages,
  bookTitle,
  isVisible,
  onClose,
  onConfirm,
}: ConfirmationModal) {
  const [title, setTitle] = useState('');

  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);
  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('modal-root') as HTMLElement;

  function handleBookTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setTitle(value);
  }

  function handleClose() {
    setTitle('');
    onClose();
  }

  function handleConfirm() {
    onConfirm();

    handleClose();
  }

  return ReactDOM.createPortal(
    <div
      ref={animatedElementRef}
      className={`animate-fade-in fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-[1px] ${!isVisible && 'animate-fade-out-100'}`}
    >
      <div
        className={`bg-blue-black-op-80 animate-scale-in-300 flex flex-col gap-2 rounded-lg p-5 ${!isVisible && 'animate-scale-out-100'}`}
      >
        <p className="font-quicksand text-snow-white">
          Essa ação não poderá ser desfeita. Digite o título do livro para
          continuar.
        </p>

        <div className="bg-navy-blue h-[0.1px] w-full" />

        {remainingPages && (
          <p className="text-light-gray font-quicksand mt-10 text-sm">
            Ainda {remainingPages > 1 ? 'faltam' : 'falta'} {remainingPages}
            {remainingPages > 1 ? ' páginas' : ' pagina'} para terminar{' '}
            {bookTitle}!
          </p>
        )}

        <input
          type="text"
          placeholder={bookTitle}
          value={title}
          onChange={handleBookTitleChange}
          className="bg-navy-blue-op-80 focus:border-snow-white-op-70 border-light-gray-op-40 font-quicksand text-light-gray mt-2 h-8 rounded-[4px] border px-2 transition-colors duration-300 ease-in-out outline-none"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="text-mate-gray hover:text-mate-gray-op-60 font-roboto transition-colors duration-300 ease-in-out hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={title !== bookTitle}
            onClick={handleConfirm}
            className="bg-sky-blue text-mate-gray hover:bg-sky-blue-op-80 disabled:bg-sky-blue-op-60 font-roboto rounded-lg px-3 py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    container
  );
}
