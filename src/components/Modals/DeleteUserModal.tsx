import { useState } from 'react';

import { useMutateDeleteUser } from '../../app/hooks/mutations/user/useMutateDeleteUser';

import { useAuth } from '../../app/hooks/useAuth';

import ModalBase from './ModalBase';
import Input from './Input';

interface DeleteUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function DeleteUserModal({
  isVisible,
  onClose,
}: DeleteUserModalProps) {
  const { user } = useAuth();

  const { deleteUser, isDeleting } = useMutateDeleteUser();

  const [value, setValue] = useState('');

  return (
    <ModalBase
      danger
      title="Esta ação não poderá ser desfeita. Você perderá todo seu progresso de livros lidos e cadastrados."
      subTitle="Digite seu nome de usuário para continuar."
      isVisible={isVisible}
      isLoading={isDeleting}
      buttonLabelConfirm="Confirmar"
      buttonDisabled={user?.username !== value}
      onClose={() => onClose()}
      onConfirm={deleteUser}
    >
      <Input
        value={value}
        disabled={isDeleting}
        onChange={({ target }) => setValue(target.value)}
        placeholder={user?.username}
      />
    </ModalBase>
  );
}
