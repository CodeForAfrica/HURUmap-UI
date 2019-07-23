import { useState, useEffect } from 'react';

export default function getWindowSize() {
  const isClient = typeof window === 'object';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [windowSize, setWindowSize] = useState(getSize);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]);

  return windowSize;
}
