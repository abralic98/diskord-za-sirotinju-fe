"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateServer } from "./components/CreateServer";
import { SingleServer } from "./components/SingleServer";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import {
  GetAllServersSidebarDocument,
  GetAllServersSidebarQuery,
} from "@/generated/graphql";
import { client, requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import { useServerListSidebarStore } from "./store";
import { useEffect } from "react";

export const ServerList = () => {
  const { setServers } = useServerListSidebarStore();
  const { data, error } = useQuery({
    queryKey: [queryKeys.getAllServersSidebar],
    queryFn: async (): Promise<GetAllServersSidebarQuery> => {
      return await requestWithAuth<GetAllServersSidebarQuery>(
        GetAllServersSidebarDocument,
      );
    },
  });

  useEffect(() => {
    if (data?.getAllServers) {
      setServers(data.getAllServers);
    }
  }, [data]);

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }
  const renderServers = () => {
    return data?.getAllServers?.map((server) => {
      return <SingleServer key={server?.id} server={server} />;
    });
  };

  return (
    <ScrollArea className="h-full w-[60px] rounded-md">
      <div className="overflow-y-scroll w-full flex flex-col gap-md items-center">
        <CreateServer />
        {renderServers()}
      </div>
    </ScrollArea>
  );
};
