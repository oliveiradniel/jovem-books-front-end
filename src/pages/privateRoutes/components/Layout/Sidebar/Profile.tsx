import { useState } from 'react';

import { useAuth } from '../../../../../app/hooks/useAuth.ts';

import useAnimatedUnmount from '../../../../../app/hooks/useAnimatedUnmount.ts';

import { env } from '../../../../../config/env.ts';

import { FaCircleUser } from 'react-icons/fa6';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

interface ProfileProps {
  isExpanded: boolean;
}

export default function Profile({ isExpanded }: ProfileProps) {
  const [hoverOnProfile, setHoverOnProfile] = useState(false);

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

  return (
    <button
      type="button"
      onMouseOver={() => setHoverOnProfile(true)}
      onMouseOut={() => setHoverOnProfile(false)}
      className={`hover:bg-navy-blue bottom-0 m-1 flex justify-between rounded-sm px-5 py-2 transition-colors duration-300 ease-in-out hover:cursor-pointer ${!isExpanded && 'justify-center gap-2'}`}
    >
      <div className="flex items-center gap-2">
        {user?.username ? (
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
          className={`text-snow-white-op-70 transition-colors duration-300 ease-in-out ${hoverOnProfile && 'text-snow-white!'}`}
        >
          <IoMdArrowDropup />
          <IoMdArrowDropdown />
        </div>
      )}
    </button>
  );
}
