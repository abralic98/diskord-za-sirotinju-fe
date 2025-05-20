import { useEffect } from "react";

export function useDebounce(
  callback: () => void,
  delay: number,
  dependency: any[],
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, dependency);
}
