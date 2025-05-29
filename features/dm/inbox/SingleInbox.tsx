import { Text } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth/store";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { Inbox, Maybe, UserPresenceType } from "@/generated/graphql";
import routes from "@/lib/routes";
import Link from "next/link";
import React, { ReactNode } from "react";
import { InboxCard } from "./InboxCard";

export const SingleInbox = ({ inbox }: { inbox?: Inbox | null }) => {
  const { user: currentUser } = useAuthStore();
  const { open } = useSidebar();
  if (!inbox) return null;

  const inboxTitle = (): ReactNode | string => {
    if (!inbox.users) return null;

    if (inbox.users.length === 2) {
      const secondUser = inbox.users.find(
        (user) => user?.id !== currentUser?.id,
      );
      return <Text>{secondUser?.username}</Text>;
    }

    if (inbox.users.length > 2) {
      return <Text>{inbox.users.map((user) => ` ${user?.username} `)}</Text>;
    }
    return [];
  };

  const inboxDescription = (): ReactNode => {
    if (!inbox.users) return null;

    if (inbox.users.length === 2) {
      const secondUser = inbox.users.find(
        (user) => user?.id !== currentUser?.id,
      );
      return <Label className="text-xs">{secondUser?.username}</Label>;
    }

    if (inbox.users.length > 2) {
      return <Label>{`${inbox.users.length} Members`}</Label>;
    }
  };

  const inboxAvatar = (): ReactNode => {
    if (!inbox.users) return "";
    if (inbox.users?.length === 2) {
      const secondUser = inbox.users.find(
        (user) => user?.id !== currentUser?.id,
      );
      return (
        <UserAvatar
          withPresence={secondUser?.userPresence ?? UserPresenceType.Offline}
          userAvatar={secondUser?.avatar}
        />
      );
    }
    if (inbox.users.length > 2) {
      return <UserAvatar />;
    }
  };

  return (
    <Link href={`${routes.dm}/${inbox.id}`}>
      <InboxCard>
        {inboxAvatar()}
        {open && (
          <div className="flex flex-col">
            {inboxTitle()}
            {inboxDescription()}
          </div>
        )}
      </InboxCard>
    </Link>
  );
};
