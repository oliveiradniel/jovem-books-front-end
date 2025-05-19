import { ChangeEvent, useState } from 'react';

import Modal from './ModalBase.tsx';
import Input from './Input.tsx';

interface FinishBookModalProps {
  bookTitle: string;
  remainingPages: number;
  isVisible: boolean;
  isUpdating: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function FinishBookModal({
  remainingPages,
  bookTitle,
  isVisible,
  isUpdating,
  onClose,
  onConfirm,
}: FinishBookModalProps) {
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
  }

  return (
    <Modal
      title="Essa ação não poderá ser desfeita. Digite o título do livro para continuar."
      buttonDisabled={title !== bookTitle}
      isVisible={isVisible}
      isLoading={isUpdating}
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
        disabled={isUpdating}
        onChange={handleBookTitleChange}
      />
    </Modal>
  );
}
