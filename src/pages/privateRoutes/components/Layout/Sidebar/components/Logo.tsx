import useAnimatedUnmount from '../../../../../../app/hooks/useAnimatedUnmount.ts';

import { IoIosMenu } from 'react-icons/io';

interface LogoProps {
  isExpanded: boolean;
  onExpansionToggle: () => void;
}

export default function Logo({ isExpanded, onExpansionToggle }: LogoProps) {
  const {
    shouldRender: shouldRenderTitle,
    animatedElementRef: animatedTitleRef,
  } = useAnimatedUnmount<HTMLHeadingElement>(isExpanded);

  return (
    <div
      className={`flex h-[70px] justify-between p-5 ${!isExpanded && 'justify-center'}`}
    >
      {shouldRenderTitle && (
        <h1
          ref={animatedTitleRef}
          className={`animate-fade-in-500 text-snow-white font-bebas-neue gap-2 text-3xl whitespace-nowrap ${!isExpanded && 'animate-fade-out-100 justify-center'}`}
        >
          JOVEM BOOKS
        </h1>
      )}
      <button
        type="button"
        onClick={onExpansionToggle}
        className="hover:cursor-pointer"
      >
        <IoIosMenu className="text-snow-white hover:text-snow-white-op-70 text-2xl transition-colors duration-300 ease-in-out" />
      </button>
    </div>
  );
}
