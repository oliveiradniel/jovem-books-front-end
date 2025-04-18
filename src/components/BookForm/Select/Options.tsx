import { useEffect } from 'react';

import useAnimatedUnmount from '../../../app/hooks/useAnimatedUnmount.ts';

import Button from './Button';

import { TLiteraryGenre } from '../../../@types/Book.ts';

interface OptionsProps {
  options: TLiteraryGenre[];
  isVisible: boolean;
}

export default function Options({ options, isVisible }: OptionsProps) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isVisible);

  useEffect(() => {
    if (shouldRender) {
      requestAnimationFrame(() => {
        animatedElementRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      });
    }
  }, [animatedElementRef, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      id="options"
      ref={animatedElementRef}
      className={`font-roboto bg-navy-blue animate-move-in-bottom-d300-y30 absolute mt-12 flex w-full flex-wrap justify-between gap-2 rounded-lg p-1 ${!isVisible && 'animate-return-to-top-d200-y50'}`}
    >
      {options.map((value) => (
        <Button key={value} label={value} />
      ))}
    </div>
  );
}
