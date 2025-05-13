"use client";
import { SingleMessage } from "@/features/shared/messages/SingleMessage";
import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
} from "@/generated/graphql";
import { ErrorMessages, GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CreateMessage } from "./CreateMessage";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { NoMessages } from "../../components/NoMessages";
import { useIds } from "@/hooks/useIds";
import { usePagination } from "@/hooks/usePagination";
import { PaginationTrigger } from "@/features/shared/PaginationTrigger";
import { scrollToBottom } from "@/helpers/scrollToBottom";
import { usePaginationScrolling } from "@/hooks/usePaginationScrolling";
import { AccessDenied } from "@/features/shared/AccessDenied";

export const RoomMessages = () => {
  const { height } = useWindowDimensions();
  const { roomId } = useIds();
  const [firstScroll, setFirstScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const query = usePagination<GetMessagesByRoomIdQuery, "getMessagesByRoomId">({
    queryKey: [queryKeys.getMessagesByRoomId, roomId],
    document: GetMessagesByRoomIdDocument,
    variables: { id: roomId },
    dataField: "getMessagesByRoomId",
    pageSize: 20,
    gcTime:0, //temp fix
  });

  usePaginationScrolling(scrollRef, query);

  //initial scroll
  useEffect(() => {
    if (query.data && firstScroll) {
      setFirstScroll(false);
      scrollToBottom(scrollRef.current);
    }
  }, [query.data]);

  if (query.error) {
    const err = query.error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }

  const renderMessages = () => {
    console.log(query.error?.message);
    if (
      query.error?.message.includes(ErrorMessages.ACCESS_DENIED) ||
      query.error?.message.includes(ErrorMessages.INTERNAL_ERROR)
    )
      return <AccessDenied type="no permission" />;
    if (query.error?.message.includes(ErrorMessages.NOT_FOUND)) {
      return <AccessDenied type="not found" />;
    }
    if (!query.data?.pages?.length) return <NoMessages />;

    const allMessages = query.data.pages.flatMap(
      (page) => page.getMessagesByRoomId?.content ?? [],
    );

    if (!allMessages.length) return <NoMessages />;

    return [...allMessages]
      .reverse()
      .map((message) => <SingleMessage key={message.id} message={message} />);
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
      </div>
      <div className="pb-4 pl-2 pr-2">
        <CreateMessage scrollRef={scrollRef} />
      </div>
    </div>
  );
};
