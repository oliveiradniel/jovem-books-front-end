import { useEffect, useLayoutEffect, useState } from 'react';

import Logo from './components/Logo.tsx';
import Navigation from './components/Navigation.tsx';
import Profile from './components/Profile.tsx';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpansionToggle() {
    if (window.innerWidth < 640) {
      return;
    }

    setIsExpanded((prevState) => !prevState);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 700 && isExpanded) {
        setIsExpanded(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded]);

  useLayoutEffect(() => {
    if (window.innerWidth <= 700) {
      setIsExpanded(false);
    }
  }, []);

  return (
    <div
      className={`bg-blue-black-op-80 relative flex w-56 flex-col justify-between rounded-s-sm transition-all duration-300 ease-in-out ${!isExpanded && 'w-20!'}`}
    >
      <Logo isExpanded={isExpanded} onExpansionToggle={handleExpansionToggle} />

      <Navigation isExpanded={isExpanded} />

      <Profile isExpanded={isExpanded} />
    </div>
  );
}
