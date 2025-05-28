import { H4, Text } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { Message } from "@/generated/graphql";
import { formatDate, formatWSDate } from "@/helpers/date";
import React from "react";

interface Props {
  message: Message | null;
  ws?: boolean;
}
export const SingleMessage = ({ message, ws = false }: Props) => {
  const renderDate = (): string => {
    if (ws) {
      console.log(formatWSDate(message?.dateCreated), "jebeni ws date");
      return formatWSDate(message?.dateCreated);
    } else {
      return formatDate(message?.dateCreated);
    }
  };
  return (
    <div className="hover:bg-sidebar-border w-full flex flex-row justify-between items-center border border-sidebar-border p-2">
      <div className=" flex items-center justify-start gap-md">
        <UserAvatar userAvatar={message?.author?.avatar} />
        <div>
          <H4>{message?.author?.username}</H4>
          <Text>{message?.text}</Text>
        </div>
      </div>
      <Label>{renderDate()}</Label>
    </div>
  );
};
