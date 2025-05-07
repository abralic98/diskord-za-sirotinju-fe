"use client";

import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type PaginationTriggerProps = {
  query: UseInfiniteQueryResult;
};

export const PaginationTrigger: React.FC<PaginationTriggerProps> = ({
  query,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log(hasNextPage, "imalib");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!hasNextPage) return null;

  return (
    <div ref={ref} className="py-2 text-center text-muted-foreground">
      {isFetchingNextPage ? "Loading more..." : "Load more messages..."}
    </div>
  );
};
