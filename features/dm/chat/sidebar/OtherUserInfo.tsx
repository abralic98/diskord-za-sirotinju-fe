import { H4, Text } from "@/components/typography";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { User, UserPresenceType } from "@/generated/graphql";
import React from "react";
import { InboxCard } from "../../inbox/InboxCard";
import { formatDate } from "@/helpers/date";
import { Label } from "@/components/ui/label";

export const OtherUserInfo = ({ user }: { user?: User | null }) => {
  if (!user) return null;
  return (
    <div className="flex flex-col gap-md p-4">
      <UserAvatar
        className="w-25 h-25"
        withPresence={user.userPresence ?? UserPresenceType.Offline}
        userAvatar={user.avatar}
        presenceClassName="w-5 h-5 right-2"
      />
      <H4>{user.username}</H4>
      <InboxCard className="flex flex-col gap-md p-4">
        <div className="flex flex-col gap-sm">
          <Text>About me</Text>
          <Label> descfription backend</Label>
        </div>
        <div className="flex flex-col gap-sm">
          <Text>Member Since</Text>
          <Label>{formatDate(user.dateCreated)}</Label>
        </div>
      </InboxCard>
    </div>
  );
};
