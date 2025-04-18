import { ChangeEvent, useState } from 'react';

import ModalBase from './ModalBase';
import Input from './Input';

interface DeleteBookModalProps {
  bookTitle: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteBookModal({
  bookTitle,
  isVisible,
  onClose,
  onConfirm,
}: DeleteBookModalProps) {
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
    <ModalBase
      danger
      title="A exclusão do livro não poderá ser desfeita. Digite o título do livro para continuar."
      buttonLabelConfirm="Excluir"
      buttonDisabled={title !== bookTitle}
      isVisible={isVisible}
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <Input
        danger
        autoFocus
        type="text"
        placeholder={bookTitle}
        value={title}
        onChange={handleBookTitleChange}
      />
    </ModalBase>
  );
}
