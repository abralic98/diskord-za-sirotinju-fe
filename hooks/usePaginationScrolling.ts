import { useEffect, useState, RefObject } from "react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

export const usePaginationScrolling = (
  scrollRef: RefObject<HTMLElement | null>, 
  query: UseInfiniteQueryResult,
) => {
  const [scrollHeightBeforeLoad, setScrollHeightBeforeLoad] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) return; 

    if (query.isFetchingNextPage) {
      setScrollHeightBeforeLoad(scrollRef.current.scrollHeight);
    } else if (scrollHeightBeforeLoad && !query.isFetchingNextPage) {
      const scrollContainer = scrollRef.current;
      const newScrollHeight = scrollContainer.scrollHeight;
      scrollContainer.scrollTop = newScrollHeight - scrollHeightBeforeLoad;
      setScrollHeightBeforeLoad(0);
    }
  }, [query.isFetchingNextPage, scrollHeightBeforeLoad, scrollRef]);
};
