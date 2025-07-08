import { useEffect } from 'react';

interface UseSetDocumentTitle {
  title: string;
}

export function useSetDocumentTitle({ title }: UseSetDocumentTitle) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Jovem Books`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
