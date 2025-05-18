import ReactDOM from 'react-dom';

import useAnimatedUnmount from '../../app/hooks/useAnimatedUnmount.ts';

import { ClipLoader } from 'react-spinners';

interface ModalBaseProps {
  danger?: boolean;
  title?: string;
  subTitle?: string | null;
  buttonLabelConfirm: string;
  isLoading?: boolean;
  isVisible: boolean;
  buttonDisabled?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalBase({
  danger,
  title,
  buttonLabelConfirm,
  isLoading = false,
  isVisible,
  buttonDisabled = false,
  onClose,
  onConfirm,
  children,
  subTitle = null,
}: ModalBaseProps) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);

  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('modal-root') as HTMLElement;

  function handleConfirm() {
    onConfirm();
  }

  return ReactDOM.createPortal(
    <div
      ref={animatedElementRef}
      className={`animate-fade-in fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/60 p-4 backdrop-blur-[1px] ${!isVisible && 'animate-fade-out-100'}`}
    >
      <div
        className={`bg-blue-black-op-80 animate-scale-in-300 flex flex-col gap-2 rounded-lg p-5 ${!isVisible && 'animate-scale-out-100'} ${danger && 'border-blood-red border'}`}
      >
        {title && (
          <p className="font-quicksand text-snow-white max-w-[500px] text-sm">
            {title}
          </p>
        )}

        {title && <div className="bg-navy-blue h-[0.1px] w-full" />}

        {subTitle && (
          <p className="text-light-gray font-quicksand mt-10 text-xs">
            {subTitle}
          </p>
        )}

        {children}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-mate-gray hover:text-mate-gray/80 font-roboto transition-colors duration-300 ease-in-out hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={buttonDisabled}
            onClick={handleConfirm}
            className={`text-mate-gray font-roboto min-w-[130px] rounded-lg px-3 py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default ${danger ? 'bg-blood-red disabled:bg-blood-red/60 hover:bg-blood-red/80' : 'disabled:bg-navy-blue/80 hover:bg-navy-blue bg-navy-blue-2'}`}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={16} />
            ) : (
              buttonLabelConfirm
            )}
          </button>
        </div>
      </div>
    </div>,
    container
  );
}
