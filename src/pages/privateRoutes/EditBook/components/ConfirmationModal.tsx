import { ChangeEvent, useState } from 'react';

import Modal from '../../components/Modal';
import Input from '../../components/InputModal';

interface ConfirmationModalProps {
  bookTitle: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  bookTitle,
  isVisible,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  const [title, setTitle] = useState('');

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

  return (
    <Modal
      danger
      title="A exclusão do livro não poderá ser desfeita. Digite o título do livro para continuar."
      buttonDisabled={title !== bookTitle}
      isVisible={isVisible}
      onClose={handleClose}
      onConfirm={handleConfirm}
      buttonLabelConfirm="Excluir"
    >
      <Input
        danger
        autoFocus
        type="text"
        placeholder={bookTitle}
        value={title}
        onChange={handleBookTitleChange}
      />
    </Modal>
  );
}
