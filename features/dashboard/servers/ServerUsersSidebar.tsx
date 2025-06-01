"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import {
  GetJoinedUsersByServerIdDocument,
  GetJoinedUsersByServerIdQuery,
  GetServerByIdDocument,
  GetServerByIdQuery,
} from "@/generated/graphql";
import { SingleUser } from "./components/SingleUser";
import { useIds } from "@/hooks/useIds";
import { useUserListSidebarStore } from "./store";
import { requestWithAuth } from "@/lib/graphql/client";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { RightSidebar } from "@/components/custom/sidebars/RightSidebar";

export const ServerUsersSidebar = () => {
  const { isOpen } = useUserListSidebarStore();
  const { serverId } = useIds();

  const { data, error } = useQuery({
    queryKey: [queryKeys.getJoinedUsersByServerId, serverId],
    enabled: Boolean(serverId) && isOpen,
    queryFn: async (): Promise<GetJoinedUsersByServerIdQuery> => {
      return await requestWithAuth<GetJoinedUsersByServerIdQuery>(
        GetJoinedUsersByServerIdDocument,
        {
          id: serverId,
        },
      );
    },
  });

  if (error) {
    handleGraphqlError(error);
  }

  const renderUsers = () => {
    const ownerId = data?.getServerById?.createdBy?.id;
    return data?.getServerById?.joinedUsers?.map((user) => {
      const isOwner = user?.id === ownerId;
      return <SingleUser isOwner={isOwner} key={user?.id} user={user} />;
    });
  };

  return <RightSidebar open={isOpen} content={renderUsers()} />;
};
