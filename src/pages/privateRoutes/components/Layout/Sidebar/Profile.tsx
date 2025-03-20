import { useState } from 'react';

import { useAuth } from '../../../../../app/hooks/useAuth.ts';

import useAnimatedUnmount from '../../../../../app/hooks/useAnimatedUnmount.ts';

import { env } from '../../../../../config/env.ts';

import { FaCircleUser } from 'react-icons/fa6';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { PiGearSixFill } from 'react-icons/pi';
import { TbLogout2 } from 'react-icons/tb';

interface ProfileProps {
  isExpanded: boolean;
}

export default function Profile({ isExpanded }: ProfileProps) {
  const [hoverOnProfile, setHoverOnProfile] = useState(false);

  const [areTheProfileOptionsOpen, setAreTheProfileOptionsOpen] =
    useState(false);

  const { user } = useAuth();

  const firstTenCharacters = user?.username.slice(0, 10);
  const shortenedUsername =
    user?.username && user.username?.length > 10
      ? `${firstTenCharacters}...`
      : firstTenCharacters;

  const {
    shouldRender: shouldRenderUsername,
    animatedElementRef: animatedUsernameRef,
  } = useAnimatedUnmount<HTMLHeadingElement>(isExpanded);

  const {
    shouldRender: shouldRenderOptions,
    animatedElementRef: animatedOptionsRef,
  } = useAnimatedUnmount<HTMLDivElement>(areTheProfileOptionsOpen);

  function handleVisibilityOfProfileOptionsToggle() {
    setAreTheProfileOptionsOpen((prevState) => !prevState);
  }

  return (
    <>
      {shouldRenderOptions && (
        <div
          ref={animatedOptionsRef}
          className={`animate-move-in-top-300 absolute bottom-14 left-0 w-[220px] p-1 ${!areTheProfileOptionsOpen && 'animate-return-to-bottom-200'} ${!isExpanded && 'w-[220px]!'}`}
        >
          <div className="bg-navy-blue flex h-full flex-col gap-1 rounded-lg p-1">
            <div className="text-mate-gray hover:bg-blue-black flex items-center gap-2 rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out hover:cursor-pointer">
              <PiGearSixFill className="text-lg" />
              <span className="text-sm">Perfil</span>
            </div>

            <div className="bg-blue-black-op-80 h-[0.1px] w-full"></div>

            <div className="text-mate-gray hover:bg-blue-black flex items-center gap-2 rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out hover:cursor-pointer">
              <TbLogout2 className="text-lg" />
              <span className="text-sm">Sair</span>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleVisibilityOfProfileOptionsToggle}
        onMouseOver={() => setHoverOnProfile(true)}
        onMouseOut={() => setHoverOnProfile(false)}
        className={`hover:bg-navy-blue bottom-0 m-1 flex justify-between rounded-sm px-5 py-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${!isExpanded && 'justify-center gap-2'}`}
      >
        <div className="flex items-center gap-2">
          {user?.imagePath ? (
            <img
              src={`${env.API_URL}/uploads/users/${user.imagePath}`}
              alt="Foto de Perfil"
              className="h-7 w-7 rounded-full"
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
