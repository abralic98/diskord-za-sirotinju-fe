import { useState, useEffect } from 'react';

type WindowDimensions = {
  width: number;
  height: number;
};

export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Prevents errors during server-side rendering in Next.js
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Set initial size

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
