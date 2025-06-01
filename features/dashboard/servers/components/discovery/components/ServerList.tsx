import {
  GetAllServersDocument,
  GetAllServersQuery,
  GetAllServersQueryVariables,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { usePagination } from "@/hooks/usePagination";
import React, { useEffect, useRef } from "react";
import { SingleServer } from "./SingleServer";
import { PaginationTrigger } from "@/features/shared/PaginationTrigger";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";

export const ServerList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const form = useFormContext<{ search: string }>();
  const search = form.watch("search");

  const query = usePagination<GetAllServersQuery, "getAllServers">({
    queryKey: [queryKeys.getAllServersDiscovery],
    document: GetAllServersDocument,
    dataField: "getAllServers",
    pageSize: 10,
    gcTime: 0,
    search: search,
  });

  useDebounce(
    () => {
      query.refetch();
    },
    200,
    [search],
  );

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
      <div className="w-full bg-sidebar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderServers()}
      </div>
      {query.hasNextPage && <PaginationTrigger query={query} />}
    </div>
  );
};
