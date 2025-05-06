import { useState } from 'react';

import { useAuth } from '../../../app/hooks/useAuth';

import ProfileForm from './components/ProfileForm';
import DeleteUserModal from '../../../components/Modals/DeleteUserModal';

export default function Profile() {
  const { user } = useAuth();

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  return (
    <>
      <DeleteUserModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />

      <div className="flex min-h-[580px] flex-col items-center justify-center">
        <ProfileForm
          key={user?.id}
          user={user}
          isBeingEdited={isBeingEdited}
          onEditCancellation={() => setIsBeingEdited(false)}
        />

        {!isBeingEdited && (
          <div className="mt-4 flex w-[clamp(340px,64vw,500px)] flex-col items-stretch justify-center gap-1 px-5">
            <button
              type="button"
              disabled={!user}
              onClick={() => setIsBeingEdited(true)}
              className="bg-sky-blue text-snow-white font-roboto hover:bg-sky-blue/90 disabled:bg-light-gray cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default"
            >
              Editar
            </button>

            <button
              type="button"
              disabled={!user}
              onClick={() => setIsDeleteModalVisible(true)}
              className="bg-blood-red text-snow-white font-roboto hover:bg-blood-red/90 disabled:bg-light-gray cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default"
            >
              Excluir usuário
            </button>
          </div>
        )}
      </div>
    </>
  );
}
