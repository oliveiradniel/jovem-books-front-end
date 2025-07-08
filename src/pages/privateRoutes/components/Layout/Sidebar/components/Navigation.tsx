import { Link, useLocation } from 'react-router-dom';

import useAnimatedUnmount from '../../../../../../app/hooks/useAnimatedUnmount.ts';

import { getMenuItems } from '../../../../../../assets/mocks/menuItems.tsx';

interface NavigationProps {
  isExpanded: boolean;
}

export default function Navigation({ isExpanded }: NavigationProps) {
  const { pathname } = useLocation();

  const {
    shouldRender: shouldRenderMenuLabel,
    animatedElementRef: animatedMenuLabelRef,
  } = useAnimatedUnmount<HTMLDivElement>(isExpanded);

  const menuItems = getMenuItems(isExpanded);

  return (
    <nav>
      <ul className="flex flex-col gap-1 p-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`text-mate-gray font-quicksand text-base font-bold ${item.url === pathname && 'bg-navy-blue/80 text-sky-blue cursor-default!'} hover:bg-navy-blue/80 ease-in- rounded-sm transition-colors duration-300`}
          >
            <Link
              to={item.url}
              className={`flex items-center gap-2 px-5 py-3 ${!isExpanded && 'justify-center'}`}
            >
              <div className="flex">{item.icon}</div>
              {shouldRenderMenuLabel && (
                <div
                  ref={animatedMenuLabelRef}
                  className={`animate-fade-in-500 absolute ml-6 whitespace-nowrap ${!isExpanded && 'animate-fade-out-100'}`}
                >
                  {item.label}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
