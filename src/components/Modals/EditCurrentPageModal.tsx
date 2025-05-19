import { ChangeEvent, useEffect, useState } from 'react';

import { useAuth } from '../../app/hooks/useAuth.ts';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import Input from './Input.tsx';
import Modal from './ModalBase.tsx';

interface EditCurrentPageModalProps {
  currentPage: number | null;
  pagesTotalNumber: number;
  isVisible: boolean;
  isUpdating: boolean;
  onClose: () => void;
  onConfirm: (number: number) => void;
}

export default function EditCurrentPageModal({
  currentPage,
  pagesTotalNumber,
  isVisible,
  isUpdating,
  onClose,
  onConfirm,
}: EditCurrentPageModalProps) {
  const { user } = useAuth();

  const [numberOfPage, setNumberOfPage] = useState<number | null>(null);

  const buttonDisabled =
    Number(numberOfPage) === 0 || !numberOfPage || currentPage === numberOfPage;

  function handleNumberOfPagesChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const number = Number(value);

    const matchPositiveInteger = /^[1-9]\d*$/;

    const validNumber = matchPositiveInteger.test(value) || value === '';

    if (!validNumber) return;

    if (number > pagesTotalNumber) return;

    const newValue = number === 0 ? null : number;
    setNumberOfPage(newValue);
  }

  function handleConfirm() {
    onConfirm(Number(numberOfPage));
  }

  function handlePageIncrement() {
    setNumberOfPage((prevState) => (prevState ?? 0) + 1);
  }

  function handlePageDecrement() {
    if (numberOfPage === 0) return;
    setNumberOfPage((prevState) => (prevState ?? 0) - 1);
  }

  useEffect(() => {
    const value = currentPage ? currentPage : null;

    setNumberOfPage(value);
  }, [currentPage]);

  return (
    <Modal
      title={`Em que página você está hoje ${user?.firstName}?`}
      buttonLabelConfirm="Salvar alterações"
      isVisible={isVisible}
      isLoading={isUpdating}
      buttonDisabled={buttonDisabled}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <div className="flex items-center gap-2">
        <Input
          autoFocus
          type="text"
          placeholder="Página atual"
          value={numberOfPage ?? ''}
          disabled={isUpdating}
          onChange={handleNumberOfPagesChange}
        />

        <button
          type="button"
          disabled={isUpdating}
          onClick={handlePageIncrement}
          className="bg-navy-blue-2 text-snow-white hover:bg-navy-blue disabled:bg-navy-blue/80 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300 ease-in-out disabled:cursor-default"
        >
          <AiOutlinePlus size={14} />
        </button>

        <button
          type="button"
          disabled={numberOfPage === 0 || isUpdating}
          onClick={handlePageDecrement}
          className="bg-navy-blue-2 text-snow-white hover:bg-navy-blue disabled:bg-navy-blue/80 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300 ease-in-out disabled:cursor-default"
        >
          <AiOutlineMinus size={14} />
        </button>
      </div>
    </Modal>
  );
}
