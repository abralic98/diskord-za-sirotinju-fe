"use client";

import { queryKeys } from "@/helpers/queryKeys";
import { GetInboxByIdQuery } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import { RightSidebar } from "@/components/custom/sidebars/RightSidebar";
import { queryClient } from "@/lib/react-query/queryClient";
import { SingleUser } from "../../inbox/create/SingleUser";
import { useDMUserListSidebarStore } from "../../store";
import { useAuthStore } from "@/features/auth/store";
import { OtherUserInfo } from "./OtherUserInfo";
import { Text } from "@/components/typography";

export const InboxUsersSidebar = () => {
  const { inboxId } = useIds();
  const { isOpen } = useDMUserListSidebarStore();
  const { user: currentUser } = useAuthStore();

  const inbox: GetInboxByIdQuery | undefined = queryClient.getQueryData([
    queryKeys.getInboxById,
    inboxId,
  ]);

  const inboxUsers = inbox?.getInboxById?.users ?? [];

  const renderUsers = () => {
    return inbox?.getInboxById?.users?.map((user) => {
      return <SingleUser key={user?.id} user={user} />;
    });
  };

  const userCount = inboxUsers.length ?? 0;

  const content = () => {
    if (userCount > 2) {
      return (
        <div className="flex flex-col gap-sm p-2">
          <Text>Users</Text>
          {renderUsers()}
        </div>
      );
    }
    if (userCount === 2) {
      const findOtherUser = inboxUsers.find(
        (user) => user?.id !== currentUser?.id,
      );
      return <OtherUserInfo user={findOtherUser} />;
    }
    return null;
  };

  return <RightSidebar open={isOpen} content={content()} />;
};
