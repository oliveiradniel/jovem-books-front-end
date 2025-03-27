import { ChangeEvent, useState } from 'react';
import ReactDOM from 'react-dom';

import { useAuth } from '../../../app/hooks/useAuth.ts';

import useAnimatedUnmount from '../../../app/hooks/useAnimatedUnmount.ts';

interface EditModal {
  pagesTotalNumber: number;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (number: number) => void;
}

export default function EditModal({
  pagesTotalNumber,
  isVisible,
  onClose,
  onConfirm,
}: EditModal) {
  const { user } = useAuth();

  const [numberOfPages, setNumberOfPages] = useState('');

  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);
  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('modal-root') as HTMLElement;

  function handlePageNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    const matchPositiveInteger = /^[1-9]\d*$/;
    const validNumber = matchPositiveInteger.test(value) || value === '';

    if (!validNumber) return;
    if (Number(value) > pagesTotalNumber) return;

    setNumberOfPages(value);
  }

  function handleClose() {
    onClose();
  }

  function handleConfirm() {
    onConfirm(Number(numberOfPages));

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
          Em que página você está hoje {user?.firstName}?
        </p>

        <div className="bg-navy-blue h-[0.1px] w-full" />

        <input
          type="text"
          placeholder="Número da página atual"
          value={numberOfPages}
          onChange={handlePageNumberChange}
          className="bg-navy-blue-op-80 focus:border-snow-white-op-70 border-light-gray-op-40 font-quicksand text-light-gray mt-2 h-8 appearance-none rounded-[4px] border px-2 text-sm transition-colors duration-300 ease-in-out outline-none"
        />

        <div className="m-4 flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="text-mate-gray hover:text-mate-gray-op-60 font-roboto transition-colors duration-300 ease-in-out hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-navy-blue-2 text-mate-gray hover:bg-navy-blue disabled:bg-navy-blue-op-40 font-roboto rounded-lg px-3 py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default"
          >
            Salvar alterações
          </button>
        </div>
      </div>
    </div>,
    container
  );
}
