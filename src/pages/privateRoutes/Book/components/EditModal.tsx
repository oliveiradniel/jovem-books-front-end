import { ChangeEvent, useEffect, useState } from 'react';

import { useAuth } from '../../../../app/hooks/useAuth.ts';

import Modal from './Modal.tsx';
import Input from './Input.tsx';

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

  const buttonDisabled = Number(numberOfPage) === 0 || !numberOfPage;

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
      <Input
        autoFocus
        type="text"
        placeholder="Número da página atual"
        value={numberOfPage ?? ''}
        onChange={handlePageNumberChange}
      />
    </Modal>
  );
}
