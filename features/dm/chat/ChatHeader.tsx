"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import {
  GetInboxByIdDocument,
  GetInboxByIdQuery,
  UserPresenceType,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { Text } from "@/components/typography";
import { useAuthStore } from "@/features/auth/store";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { ShowUsers } from "./ShowUsers";
import { DeleteDM } from "./DeleteDM";

export const ChatHeader = () => {
  const { inboxId } = useIds();
  const { user: currentUser } = useAuthStore();
  const { data, error } = useQuery({
    queryKey: [queryKeys.getInboxById, inboxId],
    enabled: Boolean(inboxId),
    queryFn: async (): Promise<GetInboxByIdQuery> => {
      return await requestWithAuth<GetInboxByIdQuery>(GetInboxByIdDocument, {
        id: inboxId,
      });
    },
    select: (data) => data.getInboxById,
  });

  if (error) {
    handleGraphqlError(error);
  }

  const aloneInRoom = data?.users?.length === 1;

  const renderUsers = () => {
    if (!data?.users?.length) return null;
    if (aloneInRoom) return <Text>You are alone here</Text>;

    if (data?.users?.length === 2) {
      const secondUser = data.users.find(
        (user) => user?.id !== currentUser?.id,
      );
      return (
        <div className="flex flex-row gap-md items-center">
          <UserAvatar
            withPresence={secondUser?.userPresence ?? UserPresenceType.Offline}
            userAvatar={secondUser?.avatar}
          />
          <Text>{secondUser?.username}</Text>
        </div>
      );
    }

    if (data?.users?.length > 2) {
      return <Text>{data.users.map((user) => ` ${user?.username} `)}</Text>;
    }
    return [];
  };
  return (
    <div className="flex items-center justify-between h-16 bg-sidebar border-none pl-4 pr-4">
      {data?.users?.length ? renderUsers() : <div />}
      <div className="flex flex-row gap-md">
        <DeleteDM />
        {!aloneInRoom && <ShowUsers />}
      </div>
    </div>
  );
};
