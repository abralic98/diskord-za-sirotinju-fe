import { useState, useEffect } from "react";

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
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
