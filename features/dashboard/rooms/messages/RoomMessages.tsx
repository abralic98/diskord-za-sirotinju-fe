"use client";
import { SingleMessage } from "@/features/shared/messages/SingleMessage";
import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { client } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { CreateMessage } from "./CreateMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface Props {
  roomId?: string;
}

export const RoomMessages = ({ roomId }: Props) => {
  const { height } = useWindowDimensions();
  const { data, error } = useQuery({
    queryKey: [queryKeys.getMessagesByRoomId, roomId],
    enabled: Boolean(roomId),
    queryFn: async (): Promise<GetMessagesByRoomIdQuery> => {
      return await client.request<GetMessagesByRoomIdQuery>(
        GetMessagesByRoomIdDocument,
        {
          id: roomId,
        },
      );
    },
  });

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }

  const renderMessages = () => {
    return data?.getMessagesByRoomId?.map((message) => {
      return <SingleMessage key={message?.id} message={message} />;
    });
  };

  return (
    <div
      style={{ height: height - 64 }} // height of RoomHeader
      className="flex flex-col justify-between"
    >
      <ScrollArea
        style={{ height: height - 140 }} // roomheader i create message + padding
        className="bg-sidebar-accent w-full"
      >
        <div className="overflow-y-scroll w-full p-2 flex flex-col gap-sm">
          {renderMessages()}
        </div>
      </ScrollArea>
      <div className="pb-4 pl-2 pr-2">
        <CreateMessage />
      </div>
    </div>
  );
};
