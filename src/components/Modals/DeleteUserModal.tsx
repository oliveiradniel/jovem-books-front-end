import { useState } from 'react';

import ModalBase from './ModalBase';
import Input from './Input';

interface DeleteUserModalProps {
  username: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function DeleteUserModal({
  username,
  isVisible,
  onClose,
}: DeleteUserModalProps) {
  const [value, setValue] = useState('');

  return (
    <ModalBase
      danger
      title="Esta ação não poderá ser desfeita. Você perderá todo seu progresso de livros lidos e cadastrados."
      subTitle="Digite seu nome de usuário para continuar."
      isVisible={isVisible}
      buttonLabelConfirm="Confirmar"
      buttonDisabled={username !== value}
      onClose={() => onClose()}
      onConfirm={() => {}}
    >
      <Input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder={username}
      />
    </ModalBase>
  );
}
