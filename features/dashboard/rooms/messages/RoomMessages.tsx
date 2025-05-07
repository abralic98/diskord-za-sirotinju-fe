"use client";
import { SingleMessage } from "@/features/shared/messages/SingleMessage";
import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CreateMessage } from "./CreateMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { NoMessages } from "../../components/NoMessages";
import { useIds } from "@/hooks/useIds";
import { usePagination } from "@/hooks/usePagination";
import { PaginationTrigger } from "@/features/shared/PaginationTrigger";
import { scrollToBottom } from "@/helpers/scrollToBottom";

export const RoomMessages = () => {
  const { height } = useWindowDimensions();
  const { roomId } = useIds();
  const [firstScroll, setfirstScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = usePagination<GetMessagesByRoomIdQuery>({
    queryKey: [queryKeys.getMessagesByRoomId, roomId],
    document: GetMessagesByRoomIdDocument,
    variables: { id: roomId },
    pageSize: 20,
  });

  useEffect(() => {
    if (data && firstScroll) {
      setfirstScroll(false);
      scrollToBottom(scrollRef.current);
    }
  }, [data]);

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }

  const renderMessages = () => {
    if (!data?.pages?.length) return <NoMessages />;

    const allMessages = data.pages.flatMap(
      (page) => page.getMessagesByRoomId?.content ?? [],
    );

    if (!allMessages.length) return <NoMessages />;

    return [...allMessages]
      .reverse()
      .map((message) => <SingleMessage key={message.id} message={message} />);
  };

  if (isLoading) return null;

  return (
    <div
      style={{ height: height - 64 }} // height of RoomHeader
      className="flex flex-col justify-between"
    >
      <ScrollArea
        style={{ height: height - 140 }} // roomheader i create message + padding
        className="bg-sidebar-accent w-full"
      >
        <div
          ref={scrollRef}
          className="overflow-y-scroll w-full p-2 flex flex-col gap-sm"
        >
          {hasNextPage && (
            <PaginationTrigger
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
          {renderMessages()}
        </div>
      </ScrollArea>
      <div className="pb-4 pl-2 pr-2">
        <CreateMessage />
      </div>
    </div>
  );
};
