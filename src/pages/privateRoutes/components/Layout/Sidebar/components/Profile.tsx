import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../../../../../app/hooks/useAuth.ts';

import useAnimatedUnmount from '../../../../../../app/hooks/useAnimatedUnmount.ts';
import { useCloseOnClickOutside } from '../../../../../../app/hooks/useCloseOnClickOutside.ts';

import { env } from '../../../../../../config/env.ts';

import { truncateString } from '../../../../../../utils/truncateString.ts';

import { FaCircleUser } from 'react-icons/fa6';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { PiGearSixFill } from 'react-icons/pi';
import { TbLogout2 } from 'react-icons/tb';

import SkeletonLoading from '../../../../../../components/SkeletonLoading.tsx';

interface ProfileProps {
  isExpanded: boolean;
}

export default function Profile({ isExpanded }: ProfileProps) {
  const { pathname } = useLocation();

  const queryClient = useQueryClient();

  const [hoverOnProfile, setHoverOnProfile] = useState(false);

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const { user, isLoadingUser, isRefetchingUser, signOut } = useAuth();

  const username = user?.username || '';

  const {
    shouldRender: shouldRenderUsername,
    animatedElementRef: animatedUsernameRef,
  } = useAnimatedUnmount<HTMLHeadingElement>(isExpanded);

  const {
    shouldRender: shouldRenderOptions,
    animatedElementRef: animatedOptionsRef,
  } = useAnimatedUnmount<HTMLDivElement>(isOptionsVisible);

  useCloseOnClickOutside({
    containerIds: ['select', 'options'],
    isVisible: isOptionsVisible,
    onClose: () => setIsOptionsVisible(false),
  });

  function handleVisibilityOfProfileOptionsToggle() {
    setIsOptionsVisible((prevState) => !prevState);
  }

  function handleSignOut() {
    signOut();

    queryClient.clear();
  }

  return (
    <>
      {shouldRenderOptions && (
        <div
          id="options"
          ref={animatedOptionsRef}
          className={`animate-move-in-top-300 absolute bottom-14 left-0 z-2 w-[220px] p-1 ${!isOptionsVisible && 'animate-return-to-bottom-200'} ${!isExpanded && 'w-[220px]!'}`}
        >
          <div className="bg-navy-blue flex h-full flex-col gap-1 rounded-lg p-1">
            <Link
              to="/profile"
              className={`text-mate-gray hover:bg-blue-black/70 flex items-center gap-2 rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out ${pathname === '/profile' ? 'bg-blue-black/70 cursor-default' : 'cursor-pointer'}`}
            >
              <PiGearSixFill className="text-lg" />
              <span className="text-sm">Perfil</span>
            </Link>

            <div className="bg-blue-black/70 h-[0.1px] w-full" />

            <button
              onClick={handleSignOut}
              className="text-mate-gray hover:bg-blue-black/70 flex items-center gap-2 rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out hover:cursor-pointer"
            >
              <TbLogout2 className="text-lg" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      )}

      <button
        id="select"
        type="button"
        onClick={handleVisibilityOfProfileOptionsToggle}
        onMouseOver={() => setHoverOnProfile(true)}
        onMouseOut={() => setHoverOnProfile(false)}
        className={`hover:bg-navy-blue bottom-0 z-2 m-1 flex justify-between rounded-sm px-5 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer ${!isExpanded && 'justify-center gap-2'} ${isRefetchingUser && 'opacity-60'}`}
      >
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center">
            {isLoadingUser && <SkeletonLoading rounded="full" />}

            {user?.imagePath ? (
              <img
                src={`${env.VITE_AWS_BUCKET_URL}/${user.imagePath}`}
                alt="Foto de Perfil"
                className={`h-7 w-7 rounded-full object-cover ${!isExpanded && 'min-h-7 min-w-7'}`}
              />
            ) : (
              !isLoadingUser && (
                <FaCircleUser
                  className={`text-mate-gray h-7 w-7 transition-all duration-300 ease-in-out ${hoverOnProfile && 'text-snow-white!'} ${isRefetchingUser && 'opacity-40'}`}
                />
              )
            )}
          </div>

          {shouldRenderUsername && (
            <h1
              ref={animatedUsernameRef}
              className={`animate-fade-in-500 font-quicksand text-snow-white-op-70 whitespace-nowrap transition-colors duration-300 ease-in-out ${hoverOnProfile && 'text-snow-white!'} ${!isExpanded && 'animate-fade-out-100'}`}
            >
              {isLoadingUser && 'Carregando...'}
              {user && truncateString(username, 10)}
            </h1>
          )}
        </div>

        {shouldRenderUsername && (
          <div
            className={`animate-fade-in-500 text-snow-white-op-70 transition-colors duration-300 ease-in-out ${hoverOnProfile && 'text-snow-white!'} ${!isExpanded && 'animate-fade-out-100'}`}
          >
            <IoMdArrowDropup />
            <IoMdArrowDropdown />
          </div>
        )}
      </button>
    </>
  );
}
