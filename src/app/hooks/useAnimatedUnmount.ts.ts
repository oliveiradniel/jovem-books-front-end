import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount<T extends HTMLElement>(
  isVisible: boolean
) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  const animatedElementRef = useRef<T>(null);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(isVisible);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRef = animatedElementRef.current;

    if (!isVisible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [isVisible]);

  return { shouldRender, animatedElementRef };
}
