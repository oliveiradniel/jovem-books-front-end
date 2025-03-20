import { useEffect, useState } from 'react';

import Logo from './Logo.tsx';
import Navigation from './Navigation.tsx';
import Profile from './Profile.tsx';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded]);

  return (
    <div
      className={`bg-blue-black-op-80 relative flex w-55 flex-col justify-between rounded-s-sm transition-all duration-300 ease-in-out ${!isExpanded && 'w-20!'}`}
    >
      <Logo isExpanded={isExpanded} onExpansionToggle={handleExpansionToggle} />

      <Navigation isExpanded={isExpanded} />

      <Profile isExpanded={isExpanded} />
    </div>
  );
}
