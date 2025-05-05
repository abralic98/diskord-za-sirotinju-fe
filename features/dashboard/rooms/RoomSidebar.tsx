"use client";

import { MainSidebar } from "@/components/custom/sidebars/MainSidebar";
import {
  GetRoomsByServerIdDocument,
  GetRoomsByServerIdQuery,
  GetRoomsByServerIdQueryVariables,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { client } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { SingleRoom } from "./components/SingleRoom";
import { useIds } from "@/hooks/useIds";

export const RoomSidebar = () => {
  const { serverId } = useIds();
  const { data, error } = useQuery<
    GetRoomsByServerIdQuery,
    GetRoomsByServerIdQueryVariables
  >({
    enabled: Boolean(serverId),
    queryKey: [queryKeys.getRoomsByServerId, serverId],
    queryFn: async (): Promise<GetRoomsByServerIdQuery> => {
      const variables: GetRoomsByServerIdQueryVariables = {
        id: String(serverId),
      };
      return await client.request(GetRoomsByServerIdDocument, variables);
    },
  });

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }

  const renderRooms = () => {
    return data?.getRoomsByServerId?.map((room) => {
      return <SingleRoom room={room} />;
    });
  };
  return <MainSidebar content={<div className="flex flex-col gap-md p-2">{renderRooms()}</div>} />;
};
