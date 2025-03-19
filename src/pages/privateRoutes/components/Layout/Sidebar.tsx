import { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../../../app/hooks/useAuth';

import useAnimatedUnmount from '../../../../app/hooks/useAnimatedUnmount.ts';

import { env } from '../../../../config/env.ts';

import { getMenuItems } from '../../../../assets/mocks/menuItems.tsx';

import { IoIosMenu, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { FaCircleUser } from 'react-icons/fa6';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const [hoverOnProfile, setHoverOnProfile] = useState(false);

  const { user } = useAuth();

  const { pathname } = useLocation();

  const menuItems = getMenuItems(isExpanded);

  const firstTenCharacters = user?.username.slice(0, 10);
  const shortenedUsername =
    user?.username && user.username?.length > 10
      ? `${firstTenCharacters}...`
      : firstTenCharacters;

  const {
    shouldRender: shouldRenderTitle,
    animatedElementRef: animatedTitleRef,
  } = useAnimatedUnmount<HTMLHeadingElement>(isExpanded);

  const {
    shouldRender: shouldRenderMenuLabel,
    animatedElementRef: animatedMenuLabelRef,
  } = useAnimatedUnmount<HTMLDivElement>(isExpanded);

  const {
    shouldRender: shouldRenderUsername,
    animatedElementRef: animatedUsernameRef,
  } = useAnimatedUnmount<HTMLHeadingElement>(isExpanded);

  function handleExpansionToggle() {
    if (window.innerWidth < 640) {
      return;
    }

    setIsExpanded((prevState) => !prevState);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640 && isExpanded) {
        setIsExpanded(false);
      } else if (window.innerWidth > 640 && !isExpanded) {
        setIsExpanded(true);
      }
    }

    window.addEventListener('resize', handleResize);
  }, [isExpanded]);

  console.log(shouldRenderUsername);

  return (
    <div
      className={`bg-blue-black-op-80 relative flex w-55 flex-col justify-between rounded-s-sm transition-all duration-300 ease-in-out ${!isExpanded && 'w-20!'}`}
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

      <nav>
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

      <button
        type="button"
        onMouseOver={() => setHoverOnProfile(true)}
        onMouseOut={() => setHoverOnProfile(false)}
        className={`hover:bg-navy-blue-op-80 bottom-0 m-1 flex justify-between rounded-sm px-5 py-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${!isExpanded && 'justify-center gap-2'}`}
      >
        <div className="flex items-center gap-2">
          {user?.username ? (
            <img
              src={`${env.API_URL}/uploads/users/${user.imagePath}`}
              alt="Foto de Perfil"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <FaCircleUser
              className={`text-mate-gray h-6 w-6 transition-colors duration-300 ease-in-out ${hoverOnProfile && 'text-snow-white!'}`}
            />
          )}
          {shouldRenderUsername && (
            <h1
              ref={animatedUsernameRef}
              className={`animate-fade-in-500 font-quicksand text-snow-white-op-70 whitespace-nowrap transition-colors duration-300 ease-in-out ${hoverOnProfile && 'text-snow-white!'} ${!isExpanded && 'animate-fade-out-100'}`}
            >
              {shortenedUsername}
            </h1>
          )}
        </div>

        <div
          className={`text-snow-white-op-70 transition-colors duration-300 ease-in-out ${hoverOnProfile && 'text-snow-white!'}`}
        >
          <IoMdArrowDropup />
          <IoMdArrowDropdown />
        </div>
      </button>
    </div>
  );
}
