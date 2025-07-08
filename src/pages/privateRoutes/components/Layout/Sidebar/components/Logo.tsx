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
          className={`animate-fade-in-500 font-bebas-neue gap-2 text-3xl whitespace-nowrap text-white ${!isExpanded && 'animate-fade-out-100 justify-center'}`}
        >
          JOVEM BOOKS
        </h1>
      )}
      <button
        type="button"
        onClick={onExpansionToggle}
        className="hover:cursor-pointer"
      >
        <IoIosMenu className="text-2xl text-white transition-colors duration-300 ease-in-out hover:text-white/80" />
      </button>
    </div>
  );
}
