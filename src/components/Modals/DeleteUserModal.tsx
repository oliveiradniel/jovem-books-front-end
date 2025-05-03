import { useState } from 'react';

import { useAuth } from '../../app/hooks/useAuth';

import UsersService from '../../app/services/UsersService';

import ModalBase from './ModalBase';
import Input from './Input';
import { emitToast } from '../../utils/emitToast';

interface DeleteUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function DeleteUserModal({
  isVisible,
  onClose,
}: DeleteUserModalProps) {
  const { user, signOut } = useAuth();

  const [value, setValue] = useState('');

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteUser() {
    try {
      setIsDeleting(true);

      await UsersService.deleteUser();

      signOut();

      emitToast({
        type: 'success',
        message: 'Seu usuário foi excluído com sucesso.',
      });
    } catch {
      emitToast({
        type: 'error',
        message: 'Não foi possível excluir seu usuário.',
      });
    } finally {
      setIsDeleting(false);
    }
  }

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
      onConfirm={() => handleDeleteUser()}
    >
      <Input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder={user?.username}
      />
    </ModalBase>
  );
}
