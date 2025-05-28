"use client";

import { H4 } from "@/components/typography";
import { GetRoomByIdDocument, GetRoomByIdQuery } from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { requestWithAuth } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRoomIcon } from "../helpers";
import { SearchMessages } from "./SearchMessages";
import { useUserListSidebarStore } from "../../servers/store";
import { UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIds } from "@/hooks/useIds";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const CurrentRoomHeader = () => {
  const { toggle } = useUserListSidebarStore();
  const { roomId } = useIds();
  const { data, error } = useQuery({
    queryKey: [queryKeys.getRoomById, roomId],
    enabled: Boolean(roomId),
    queryFn: async (): Promise<GetRoomByIdQuery> => {
      return await requestWithAuth<GetRoomByIdQuery>(GetRoomByIdDocument, {
        id: roomId,
      });
    },
  });

  if (error) {
    handleGraphqlError(error);
  }
  const icon = getRoomIcon({ room: data?.getRoomById });
  return (
    <div
      className={cn(
        "w-full flex items-center pr-4 justify-between pl-4 h-16 bg-sidebar-accent border border-sidebar-accent",
      )}
    >
      <div className="flex items-center justify-start gap-sm">
        {icon}
        <H4>{data?.getRoomById?.name}</H4>
      </div>
      <div className="flex items-center justify-center gap-md">
        <SearchMessages />
        <UsersIcon className="cursor-pointer" onClick={toggle} />
      </div>
    </div>
  );
};
