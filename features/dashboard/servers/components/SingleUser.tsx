import { H4, Text } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { User } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  user?: User | null;
}

export const SingleUser = ({ user }: Props) => {
  const online = false;
  return (
    <div className="hover:bg-sidebar-accent flex items-center justify-start gap-md p-3 rounded-md cursor-pointer">
      <div className="relative">
        <UserAvatar />
        <OnlineStatus online={online} />
      </div>
      <Text>{user?.username}</Text>
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
