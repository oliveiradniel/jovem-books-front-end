import { useState } from 'react';

import { HiOutlinePlus } from 'react-icons/hi';

import EditSinopseModal from './Modal/EditSinopseModal';

interface SinopseProps {
  text: string | null;
  onSinopseEdit: (sinopse: string) => void;
}

export default function Sinopse({ text, onSinopseEdit }: SinopseProps) {
  const [isEditSinopseModalVisible, setIsEditSinopseModalVisible] =
    useState(false);

  return (
    <>
      <EditSinopseModal
        text={text ?? ''}
        isVisible={isEditSinopseModalVisible}
        onClose={() => setIsEditSinopseModalVisible(false)}
        onConfirm={onSinopseEdit}
      />

      <div className="mt-8 h-[200px] max-w-[500px] overflow-auto">
        {text ? (
          <p className="text-snow-white-op-70 font-quicksand break-words">
            {text}
          </p>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <p className="text-mate-gray font-quicksand text-sm">
              Não há sinopse/descrição sobre o livro. Adicione clicando no botão
              abaixo.
            </p>

            <button
              onClick={() => setIsEditSinopseModalVisible(true)}
              className="border-sky-blue flex w-full justify-center rounded-sm border py-4 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-70"
            >
              <HiOutlinePlus size={40} color="#03a9f4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
