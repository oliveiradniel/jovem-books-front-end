import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../../../app/hooks/useAuth';

import { FaGoogle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { SiBookstack } from 'react-icons/si';
import { IoIosMenu } from 'react-icons/io';
import { useEffect, useState } from 'react';
import useAnimatedUnmount from '../../../../app/hooks/useAnimatedUnmount.ts';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640 && isExpanded) {
        setIsExpanded(false);
      } else if (window.innerWidth > 640 && !isExpanded) {
        setIsExpanded(true);
      }
    }
    console.log('aqui');

    window.addEventListener('resize', handleResize);
  }, [isExpanded]);

  const { user } = useAuth();

  const { pathname } = useLocation();

  const {
    shouldRender: shouldRenderTitle,
    animatedElementRef: animatedTitleRef,
  } = useAnimatedUnmount<HTMLHeadingElement>(isExpanded);

  const {
    shouldRender: shouldRenderMenuLabel,
    animatedElementRef: animatedTitleRefMenuLabel,
  } = useAnimatedUnmount<HTMLDivElement>(isExpanded);

  const menuItems = [
    {
      label: 'Dashboard',
      url: '/dashboard',
      icon: <MdDashboard className={`${!isExpanded && 'text-xl'}`} />,
      id: 'dashboard',
    },
    {
      label: 'Meus Livros',
      url: '/my-books',
      icon: <SiBookstack className={`${!isExpanded && 'text-xl'}`} />,
      id: 'my-books',
    },
    {
      label: 'Google Books',
      url: '/google-books',
      icon: <FaGoogle className={`${!isExpanded && 'text-xl'}`} />,
      id: 'google-books',
    },
  ];

  function handleExpansionToggle() {
    if (window.innerWidth < 640) {
      return;
    }
    setIsExpanded((prevState) => !prevState);
  }

  return (
    <div
      className={`bg-blue-black-op-80 relative w-55 rounded-s-2xl transition-all duration-300 ease-in-out ${!isExpanded && 'w-20!'}`}
    >
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
          onClick={handleExpansionToggle}
          className="hover:cursor-pointer"
        >
          <IoIosMenu className="text-snow-white hover:text-snow-white-op-70 text-2xl transition-colors duration-300 ease-in-out" />
        </button>
      </div>

      <div className="mt-20 flex flex-col justify-between">
        <nav className="flex flex-col gap-2">
          <ul className="flex flex-col gap-1 p-1">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`text-mate-gray font-quicksand text-base font-bold ${item.url === pathname && 'bg-navy-blue-op-80 text-sky-blue cursor-default!'} hover:bg-navy-blue-op-80 ease-in- rounded-sm transition-colors duration-300`}
              >
                <Link
                  to={item.url}
                  className={`flex items-center gap-2 px-5 py-3 ${!isExpanded && 'justify-center'}`}
                >
                  <div className="flex">{item.icon}</div>
                  {shouldRenderMenuLabel && (
                    <div
                      ref={animatedTitleRefMenuLabel}
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
        <div className="absolute bottom-0 flex gap-2 p-5">
          <div className="bg-mate-gray h-6 w-6 rounded-full"></div>
          <h1 className="font-quicksand text-snow-white">{user?.username}</h1>
        </div>
      </div>
    </div>
  );
}
