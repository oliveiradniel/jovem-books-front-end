import { useState } from 'react';

import { useAuth } from '../../../app/hooks/useAuth';
import { useSetDocumentTitle } from '@/app/hooks/useSetDocumentTitle';

import { IUserAPIResponse } from '../../../@types/User';

import ProfileForm from './components/ProfileForm';
import DeleteUserModal from '../../../components/Modals/DeleteUserModal';

export default function Profile() {
  useSetDocumentTitle({ title: 'Perfil ' });

  const { user, isLoadingUser, isRefetchingUser } = useAuth();

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  return (
    <>
      <DeleteUserModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />

      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
        <ProfileForm
          key={user?.id}
          user={user as IUserAPIResponse}
          isLoadingUser={isLoadingUser}
          isRefetchingUser={isRefetchingUser}
          isBeingEdited={isBeingEdited}
          onEditCancellation={() => setIsBeingEdited(false)}
          onEdit={() => setIsBeingEdited(true)}
          onOpenUserDeleteModal={() => setIsDeleteModalVisible(true)}
        />
      </div>
    </>
  );
}
