import { useState } from 'react';

import ProfileForm from './components/ProfileForm';

export default function Profile() {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  return (
    <div className="flex min-h-[580px] flex-col items-center">
      <ProfileForm
        isBeingEdited={isBeingEdited}
        onEditCancellation={() => setIsBeingEdited(false)}
      />

      {!isBeingEdited && (
        <div className="flex w-[clamp(340px,64vw,500px)] flex-col items-stretch justify-center gap-2 p-5">
          <button
            type="button"
            onClick={() => setIsBeingEdited(true)}
            className="bg-sky-blue text-snow-white font-roboto hover:bg-sky-blue/90 cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out"
          >
            Editar
          </button>

          <button
            type="button"
            className="bg-blood-red text-snow-white font-roboto hover:bg-blood-red/90 cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out"
          >
            Excluir usuário
          </button>
        </div>
      )}
    </div>
  );
}
