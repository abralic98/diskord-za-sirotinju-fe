import { User, UserPresenceType } from "@/generated/graphql";
import React from "react";
import { InboxCard } from "../InboxCard";
import { Text } from "@/components/typography";
import { SingleInbox } from "../SingleInbox";
import { UserAvatar } from "@/features/user/components/UserAvatar";

export const SingleUser = ({ user }: { user: User }) => {
  return (
    <InboxCard>
      <UserAvatar withPresence={user.userPresence ?? UserPresenceType.Offline} userAvatar={user.avatar} />
      <Text>{user.username}</Text>
      <Text>{user.phoneNumber}</Text>
    </InboxCard>
  );
};
