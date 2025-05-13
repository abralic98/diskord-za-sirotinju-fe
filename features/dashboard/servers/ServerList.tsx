"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateServer } from "./components/CreateServer";
import { SingleServer } from "./components/SingleServer";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import { GetAllUserServersSidebarDocument, GetAllUserServersSidebarQuery } from "@/generated/graphql";
import {  requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import { useServerListSidebarStore } from "./store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DiscoverServers } from "./components/discovery/DiscoverServers";

export const ServerList = () => {
  const { setServers } = useServerListSidebarStore();
  const { push } = useRouter();
  const { data, error } = useQuery({
    queryKey: [queryKeys.getAllUserServersSidebar],
    queryFn: async (): Promise<GetAllUserServersSidebarQuery> => {
      return await requestWithAuth<GetAllUserServersSidebarQuery>(
        GetAllUserServersSidebarDocument,
      );
    },
  });

  useEffect(() => {
    if (data?.getAllUserServers) {
      setServers(data.getAllUserServers);
    }
  }, [data]);

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }
  const renderServers = () => {
    return data?.getAllUserServers?.map((server) => {
      return <SingleServer key={server?.id} server={server} />;
    });
  };

  return (
    <ScrollArea className="h-full w-[60px] rounded-md">
      <div className="overflow-y-scroll w-full flex flex-col gap-md items-center">
        <CreateServer />
        <DiscoverServers />
        {renderServers()}
      </div>
    </ScrollArea>
  );
};
