import { Button } from "@/components/ui/button";
import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { usePagination } from "@/hooks/usePagination";
import { requestWithAuth } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { NoMessages } from "../../components/NoMessages";
import { SingleMessage } from "@/features/shared/messages/SingleMessage";
import { H4 } from "@/components/typography";
import { PaginationTrigger } from "@/features/shared/PaginationTrigger";

interface Props {
  search?: string;
}
export const SearchedMessagesList = ({ search }: Props) => {
  const { roomId } = useIds();

  const query = usePagination<GetMessagesByRoomIdQuery, "getMessagesByRoomId">({
    queryKey: [queryKeys.getMessagesByRoomIdSearch, roomId],
    document: GetMessagesByRoomIdDocument,
    variables: { id: roomId },
    dataField: "getMessagesByRoomId",
    pageSize: 20,
    gcTime: 0,
    search: search,
  });

  useEffect(() => {
    query.refetch();
  }, [search]);

  const renderMessages = () => {
    if (!query.data?.pages?.length) return <H4>No data</H4>;

    const allMessages = query.data.pages.flatMap(
      (page) => page.getMessagesByRoomId?.content ?? [],
    );

    if (!allMessages.length) return <H4>No messages found</H4>;

    return [...allMessages].map((message) => (
      <SingleMessage key={message.id} message={message} />
    ));
  };

  return (
    <div className="overflow-y-scroll pb-5 max-h-[700px]">
      {renderMessages()}
      {query.hasNextPage && <PaginationTrigger query={query} />}
    </div>
  );
};
