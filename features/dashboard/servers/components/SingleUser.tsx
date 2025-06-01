import { H4, Text } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { User, UserPresenceType } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { CrownIcon } from "lucide-react";
import React from "react";

interface Props {
  user?: User | null;
  isOwner: boolean;
}

export const SingleUser = ({ user, isOwner }: Props) => {
  return (
    <div className="hover:bg-sidebar-accent flex items-center justify-start gap-md p-3 rounded-md cursor-pointer">
      <div className="relative">
        <UserAvatar
          withPresence={user?.userPresence ?? UserPresenceType.Offline}
          presenceClassName="w-3 h-3"
          userAvatar={user?.avatar}
        />
      </div>
      <Text>{user?.username}</Text>
      {isOwner && <CrownIcon className="text-yellow-500" />}
    </div>
  );
};
