import { GetAllServersDocument, GetAllServersQuery } from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { usePagination } from "@/hooks/usePagination";
import React, { RefObject, useRef } from "react";
import { SingleServer } from "./SingleServer";
import { usePaginationScrolling } from "@/hooks/usePaginationScrolling";
import { PaginationTrigger } from "@/features/shared/PaginationTrigger";

export const ServerList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const query = usePagination<GetAllServersQuery, "getAllServers">({
    queryKey: [queryKeys.getAllServersDiscovery],
    document: GetAllServersDocument,
    dataField: "getAllServers",
    pageSize: 10,
    gcTime: 0,
  });

  // usePaginationScrolling(scrollRef, query);

  const renderServers = () => {
    const allServers = query.data?.pages.flatMap(
      (page) => page.getAllServers?.content ?? [],
    );
    return allServers?.map((server) => {
      return <SingleServer server={server} />;
    });
  };

  return (
    <div ref={scrollRef}>
      <div className="w-full bg-sidebar grid grid-cols-3 gap-4">
        {renderServers()}
      </div>
      {query.hasNextPage && <PaginationTrigger query={query} />}
    </div>
  );
};
