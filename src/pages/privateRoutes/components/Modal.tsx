import ReactDOM from 'react-dom';
import useAnimatedUnmount from '../../../app/hooks/useAnimatedUnmount.ts';

interface ModalProps {
  title?: string;
  subTitle?: string | null;
  buttonLabelConfirm: string;
  isVisible: boolean;
  buttonDisabled?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal({
  title,
  buttonLabelConfirm,
  isVisible,
  buttonDisabled = false,
  onClose,
  onConfirm,
  children,
  subTitle = null,
}: ModalProps) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);

  if (!shouldRender) {
    return null;
  }

  const container = document.getElementById('modal-root') as HTMLElement;

  function handleConfirm() {
    onConfirm();

    onClose();
  }

  return ReactDOM.createPortal(
    <div
      ref={animatedElementRef}
      className={`animate-fade-in fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-[1px] ${!isVisible && 'animate-fade-out-100'}`}
    >
      <div
        className={`bg-blue-black-op-80 animate-scale-in-300 flex flex-col gap-2 rounded-lg p-5 ${!isVisible && 'animate-scale-out-100'}`}
      >
        {title && (
          <p className="font-quicksand text-snow-white text-sm">{title}</p>
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
            className="text-mate-gray hover:text-mate-gray-op-60 font-roboto transition-colors duration-300 ease-in-out hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={buttonDisabled}
            onClick={handleConfirm}
            className="bg-navy-blue-2 text-mate-gray hover:bg-navy-blue disabled:bg-navy-blue-op-80 font-roboto rounded-lg px-3 py-2 font-semibold transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default"
          >
            {buttonLabelConfirm}
          </button>
        </div>
      </div>
    </div>,
    container
  );
}
