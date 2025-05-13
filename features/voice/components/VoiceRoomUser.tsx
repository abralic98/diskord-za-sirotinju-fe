import { Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { User } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  user?: User;
}
export const VoiceRoomUser = ({ user }: Props) => {
  const { open } = useSidebar();
  if (!user) return;

  return (
    <div className={cn("flex flex-row gap-md w-full items-center", open ? "justify-start" : "justify-center")}>
      <UserAvatar userAvatar={user.avatar} className="w-7 h-7" />
      {open && <Text>{user.username}</Text>}
    </div>
  );
};
