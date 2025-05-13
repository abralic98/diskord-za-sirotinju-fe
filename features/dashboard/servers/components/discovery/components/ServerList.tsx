import { GetAllServersDocument, GetAllServersQuery } from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { usePagination } from "@/hooks/usePagination";
import React, { useRef } from "react";
import { SingleServer } from "./SingleServer";
import { usePaginationScrolling } from "@/hooks/usePaginationScrolling";

export const ServerList = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const query = usePagination<GetAllServersQuery, "getAllServers">({
    queryKey: [queryKeys.getAllServersDiscovery],
    document: GetAllServersDocument,
    dataField: "getAllServers",
    pageSize: 10,
    gcTime: 0, //temp fix
  });

  usePaginationScrolling(query, scrollRef);

  const renderServers = () => {
    const allServers = query.data?.pages.flatMap(
      (page) => page.getAllServers?.content ?? [],
    );
    return allServers?.map((server) => {
      return <SingleServer server={server} />;
    });
  };

  return <div ref={scrollRef}>{renderServers()}</div>;
};
