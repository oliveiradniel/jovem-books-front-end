import { useEffect } from 'react';

interface UseCloseOnClickOutsideProps {
  containerIds: string[];
  isVisible: boolean;
  onClose: () => void;
}

export function useCloseOnClickOutside({
  containerIds,
  isVisible,
  onClose,
}: UseCloseOnClickOutsideProps) {
  useEffect(() => {
    function handleClickOutsideTheSelect(event: MouseEvent) {
      const target = event.target as HTMLElement;

      const elements = containerIds.map((id) => target.closest(`#${id}`));

      if (!elements.some((item) => item !== null)) {
        onClose();
      }
    }

    document.addEventListener('click', handleClickOutsideTheSelect);

    return () => {
      document.removeEventListener('click', handleClickOutsideTheSelect);
    };
  }, [containerIds, isVisible, onClose]);
}
