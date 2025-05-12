import { Text } from "@/components/typography";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { User } from "@/generated/graphql";
import React from "react";

interface Props {
  user?: User;
}
export const VoiceRoomUser = ({ user }: Props) => {
  if (!user) return;
  return (
    <div className="flex flex-row gap-md w-full items-center">
      <UserAvatar className="w-7 h-7" />
      <Text>{user.username}</Text>
    </div>
  );
};
