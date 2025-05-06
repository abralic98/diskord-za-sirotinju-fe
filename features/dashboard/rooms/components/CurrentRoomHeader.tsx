"use client";

import { H4 } from "@/components/typography";
import { GetRoomByIdDocument, GetRoomByIdQuery } from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { client } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { getRoomIcon } from "../helpers";
import { SearchMessages } from "./SearchMessages";
import { useUserListSidebarStore } from "../../servers/store";
import { UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface Props {
  roomId?: string;
}
export const CurrentRoomHeader = ({ roomId }: Props) => {
  const { toggle, isOpen } = useUserListSidebarStore();
  const { data, error } = useQuery({
    queryKey: [queryKeys.getRoomById, roomId],
    enabled: Boolean(roomId),
    queryFn: async (): Promise<GetRoomByIdQuery> => {
      return await client.request<GetRoomByIdQuery>(GetRoomByIdDocument, {
        id: roomId,
      });
    },
  });

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
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
