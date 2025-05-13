import { H4, Text } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { User } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { CrownIcon } from "lucide-react";
import React from "react";

interface Props {
  user?: User | null;
  isOwner: boolean;
}

export const SingleUser = ({ user, isOwner }: Props) => {
  const online = false;
  return (
    <div className="hover:bg-sidebar-accent flex items-center justify-start gap-md p-3 rounded-md cursor-pointer">
      <div className="relative">
        <UserAvatar userAvatar={user?.avatar} />
        <OnlineStatus online={online} />
      </div>
      <Text>{user?.username}</Text>
      {isOwner && <CrownIcon className="text-yellow-500" />}
    </div>
  );
};

const OnlineStatus = ({ online }: { online: boolean }) => {
  return (
    <div
      className={cn(
        online ? "bg-green-500" : "bg-red-500",
        "w-4 h-4 absolute bottom-0 right-0 rounded-full",
      )}
    />
  );
};
