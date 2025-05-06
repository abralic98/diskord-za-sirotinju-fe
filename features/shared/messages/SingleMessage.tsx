import { H4, Text } from "@/components/typography";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { Message } from "@/generated/graphql";
import React from "react";

interface Props {
  message: Message | null;
}
export const SingleMessage = ({ message }: Props) => {
  return (
    <div className="hover:bg-sidebar-border w-full flex items-center justify-start gap-md border border-sidebar-border p-2">
      <UserAvatar />
      <div>
        <H4>{message?.author?.username}</H4>
        <Text>{message?.text}</Text>
      </div>
    </div>
  );
};
