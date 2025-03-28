import { ChangeEvent, useState } from 'react';

import Modal from './index.tsx';
import Input from './../Input.tsx';

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

  const subTitle =
    remainingPages !== 0
      ? `Ainda ${remainingPages > 1 ? 'faltam' : 'falta'} ${remainingPages} ${remainingPages > 1 ? 'páginas' : 'página'} para terminar ${bookTitle}.`
      : null;

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
      title="Essa ação não poderá ser desfeita. Digite o título do livro para continuar."
      buttonDisabled={title !== bookTitle}
      isVisible={isVisible}
      onClose={handleClose}
      onConfirm={handleConfirm}
      subTitle={subTitle}
      buttonLabelConfirm="Confirmar"
    >
      <Input
        autoFocus
        type="text"
        placeholder={bookTitle}
        value={title}
        onChange={handleBookTitleChange}
      />
    </Modal>
  );
}
