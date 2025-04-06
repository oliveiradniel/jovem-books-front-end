import { ChangeEvent, useState } from 'react';

import Modal from '../../../components/Modal';

interface EditSinopseModalProps {
  text: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (sinopse: string) => void;
}

export default function EditSinopseModal({
  text,
  isVisible,
  onClose,
  onConfirm,
}: EditSinopseModalProps) {
  const [sinopse, setSinopse] = useState(text);

  function handleBookTitleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;

    setSinopse(value);
  }

  function handleClose() {
    setSinopse('');
    onClose();
  }

  function handleConfirm() {
    onConfirm(sinopse);

    handleClose();
  }

  return (
    <Modal
      buttonDisabled={sinopse.length === 0 || sinopse === text}
      isVisible={isVisible}
      onClose={handleClose}
      onConfirm={handleConfirm}
      buttonLabelConfirm="Salvar"
    >
      <textarea
        autoFocus
        placeholder="Digite a sinopse do livro"
        value={sinopse}
        onChange={handleBookTitleChange}
        className="bg-navy-blue focus:border-sky-blue-op-60 font-quicksand text-light-gray border-navy-blue-2 h-[300px] w-[400px] appearance-none rounded-[4px] border p-2 text-sm transition-colors duration-300 ease-in-out outline-none"
      />
    </Modal>
  );
}
