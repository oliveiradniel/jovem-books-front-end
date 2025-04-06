import { ChangeEvent, useEffect, useState } from 'react';

import { useAuth } from '../../../../../app/hooks/useAuth.ts';

import Input from '../../../components/InputModal.tsx';
import Modal from '../../../components/Modal.tsx';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface EditModal {
  currentPage: number | null;
  pagesTotalNumber: number;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (number: number) => void;
}

export default function EditModal({
  currentPage,
  pagesTotalNumber,
  isVisible,
  onClose,
  onConfirm,
}: EditModal) {
  const { user } = useAuth();

  const [numberOfPage, setNumberOfPage] = useState<number | null>(null);

  const buttonDisabled =
    Number(numberOfPage) === 0 || !numberOfPage || currentPage === numberOfPage;

  function handlePageNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const number = Number(value);

    const matchPositiveInteger = /^[1-9]\d*$/;

    const validNumber = matchPositiveInteger.test(value) || value === '';

    if (!validNumber) return;

    if (number > pagesTotalNumber) return;

    const newValue = number === 0 ? null : number;
    setNumberOfPage(newValue);
  }

  function handleClose() {
    onClose();
  }

  function handleConfirm() {
    onConfirm(Number(numberOfPage));

    handleClose();
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
          onChange={handlePageNumberChange}
        />

        <button
          type="button"
          onClick={handlePageIncrement}
          className="bg-navy-blue-2 text-snow-white hover:bg-navy-blue flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:cursor-pointer"
        >
          <AiOutlinePlus size={14} />
        </button>

        <button
          type="button"
          disabled={numberOfPage === 0}
          onClick={handlePageDecrement}
          className="bg-navy-blue-2 text-snow-white hover:bg-navy-blue disabled:bg-navy-blue-op-80 flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default"
        >
          <AiOutlineMinus size={14} />
        </button>
      </div>
    </Modal>
  );
}
