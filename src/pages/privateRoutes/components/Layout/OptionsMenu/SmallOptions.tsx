import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IoIosMenu } from 'react-icons/io';

import useAnimatedUnmount from '../../../../../app/hooks/useAnimatedUnmount.ts';
import { useCloseOnClickOutside } from '../../../../../app/hooks/useCloseOnClickOutside';

import { getMenuItems } from '../../../../../assets/mocks/menuItems.tsx';
import { PiGearSixFill } from 'react-icons/pi';
import { TbLogout2 } from 'react-icons/tb';
import { useAuth } from '../../../../../app/hooks/useAuth.ts';

export default function SmallOptions() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { signOut } = useAuth();

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const {
    shouldRender: shouldRenderOptions,
    animatedElementRef: animatedOptionsRef,
  } = useAnimatedUnmount<HTMLDivElement>(isOptionsVisible);

  useCloseOnClickOutside({
    containerIds: ['menu-button', 'options'],
    isVisible: isOptionsVisible,
    onClose: () => setIsOptionsVisible(false),
  });

  const menuItems = getMenuItems(false);

  function handleVisibilityOptionsToggle() {
    setIsOptionsVisible((prevState) => !prevState);
  }

  return (
    <div className="relative z-3 my-4 flex h-8 justify-end sm:hidden">
      {shouldRenderOptions && (
        <div
          id="options"
          ref={animatedOptionsRef}
          className={`blur-4 fixed top-8 top-16`}
        >
          <div
            className={`animate-move-in-bottom-30 bg-navy-blue/60 flex h-full flex-col items-center gap-1 rounded-lg p-1 backdrop-blur-[4px] ${!isOptionsVisible && 'animate-return-to-top-30'}`}
          >
            {menuItems.map((item) => (
              <button
                onClick={() => navigate(item.url)}
                className={`flex min-w-[140px] items-center gap-2 rounded-sm px-2 py-1 transition-colors duration-300 ease-in-out ${item.url === pathname ? 'text-sky-blue' : 'text-snow-white hover:bg-blue-black/70 cursor-pointer'}`}
              >
                {item.icon}
                <span className="font-roboto">{item.label}</span>
              </button>
            ))}

            <div className="bg-navy-blue h-[0.3px] w-[90%]"></div>

            <button
              onClick={() => navigate('/profile')}
              className={`flex min-w-[140px] items-center gap-2 rounded-sm px-2 py-1 transition-colors duration-300 ease-in-out ${'/profile' === pathname ? 'text-sky-blue' : 'text-snow-white hover:bg-blue-black/70 cursor-pointer'}`}
            >
              <PiGearSixFill className="text-xl" />
              <span className="font-roboto">Perfil</span>
            </button>

            <button
              onClick={signOut}
              className={`text-snow-white hover:bg-blue-black/70 flex min-w-[140px] cursor-pointer items-center gap-2 rounded-sm px-2 py-1 transition-colors duration-300 ease-in-out`}
            >
              <TbLogout2 className="text-lg" />
              <span className="font-roboto">Sair</span>
            </button>
          </div>
        </div>
      )}

      <button
        id="menu-button"
        onClick={handleVisibilityOptionsToggle}
        className="fixed z-2 cursor-pointer"
      >
        <IoIosMenu className="text-snow-white hover:text-snow-white/80 text-2xl transition-colors duration-300 ease-in-out" />
      </button>
    </div>
  );
}
