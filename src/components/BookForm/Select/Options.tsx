import { useEffect } from 'react';

import useAnimatedUnmount from '../../../app/hooks/useAnimatedUnmount.ts';

import {
  LITERARY_GENRE_LABELS,
  LITERARY_GENRE_OPTIONS,
} from '../../../constants/books.ts';
import { LiteraryGenreKey } from '../../../@types/Book.ts';

interface OptionsProps {
  selectedOptions: string[];
  isVisible: boolean;
  onChange: (value: string) => void;
}

export default function Options({
  selectedOptions,
  isVisible,
  onChange,
}: OptionsProps) {
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
      className={`font-roboto bg-navy-blue animate-move-in-bottom-d300-y30 mt-1 flex w-full flex-wrap justify-between gap-2 rounded-lg p-1 ${!isVisible && 'animate-return-to-top-d200-y50'}`}
    >
      {LITERARY_GENRE_OPTIONS.map((option, index) => {
        const isSelected = selectedOptions.includes(option);

        return (
          <button
            key={index}
            type="button"
            disabled={selectedOptions.length === 6 && !isSelected}
            onClick={() => onChange(option)}
            className={`text-light-gray border-light-gray/30 hover:bg-blue-black/50 hover:border-navy-blue disabled:bg-navy-blue! disabled:border-light-gray/10! flex items-center rounded-lg border p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default! ${isSelected && 'bg-blue-black/50 border-navy-blue'}`}
          >
            <p className="font-quicksand text-sm">
              {LITERARY_GENRE_LABELS[option as LiteraryGenreKey]}
            </p>
          </button>
        );
      })}
    </div>
  );
}
