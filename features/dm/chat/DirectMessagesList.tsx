"use client";
import { SingleMessage } from "@/features/shared/messages/SingleMessage";
import {
  GetDirectMessagesByInboxIdDocument,
  GetDirectMessagesByInboxIdQuery,
  Message,
} from "@/generated/graphql";
import { ErrorMessages } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useIds } from "@/hooks/useIds";
import { usePagination } from "@/hooks/usePagination";
import { PaginationTrigger } from "@/features/shared/PaginationTrigger";
import { scrollToBottom } from "@/helpers/scrollToBottom";
import { usePaginationScrolling } from "@/hooks/usePaginationScrolling";
import { AccessDenied } from "@/features/shared/AccessDenied";
// import { useRoomMessageConnection } from "../hooks/useRoomMessageConnection";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { NoMessages } from "@/features/dashboard/components/NoMessages";
import { CreateDirectMessage } from "./CreateDirectMessage";

export const DirectMessageList = () => {
  const { height } = useWindowDimensions();
  const { inboxId } = useIds();
  const [firstScroll, setFirstScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // useRoomMessageConnection((newMessage) => {
  //   setMessages((prev) => [...prev, newMessage]);
  // });

  const query = usePagination<
    GetDirectMessagesByInboxIdQuery,
    "getDirectMessagesByInboxId"
  >({
    queryKey: [queryKeys.getMessagesByInboxId, inboxId],
    document: GetDirectMessagesByInboxIdDocument,
    variables: { id: inboxId },
    dataField: "getDirectMessagesByInboxId",
    pageSize: 20,
    gcTime: 0,
  });

  usePaginationScrolling(scrollRef, query);

  useEffect(() => {
    if (query.data && firstScroll) {
      setFirstScroll(false);
      scrollToBottom(scrollRef.current);
    }
  }, [query.data]);

  useEffect(() => {
    if (firstScroll) return;
    scrollToBottom(scrollRef.current);
  }, [messages]);

  if (query.error) {
    handleGraphqlError(query.error);
  }

  const renderMessages = () => {
    console.log(query.error?.message);
    if (
      query.error?.message.includes(ErrorMessages.ACCESS_DENIED) ||
      query.error?.message.includes(ErrorMessages.INTERNAL_ERROR)
    )
      return <AccessDenied pushTo="dm" type="no permission" />;
    if (query.error?.message.includes(ErrorMessages.NOT_FOUND)) {
      return <AccessDenied pushTo="dm" type="not found" />;
    }
    if (!query.data?.pages?.length) return <NoMessages />;

    const allMessages = query.data.pages.flatMap(
      (page) => page.getDirectMessagesByInboxId?.content ?? [],
    );

    if (!allMessages.length) return <NoMessages />;

    return [...allMessages]
      .reverse()
      .map((message) => <SingleMessage key={message?.id} message={message} />);
  };

  const renderWebsocketMessages = () => {
    return messages.map((msg) => {
      return <SingleMessage ws={true} message={msg} />;
    });
  };

  if (query.isLoading) return null;

  return (
    <div
      style={{ height: height - 64 }} // height of RoomHeader
      className="flex flex-col justify-between"
    >
      <div
        ref={scrollRef}
        className="overflow-y-scroll w-full p-2 flex flex-col gap-sm"
      >
        {query.hasNextPage && <PaginationTrigger query={query} />}
        {renderMessages()}
        {renderWebsocketMessages()}
      </div>
      <div className="pb-4 pl-2 pr-2">
        <CreateDirectMessage scrollRef={scrollRef} />
      </div>
    </div>
  );
};
