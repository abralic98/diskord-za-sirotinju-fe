import { Text } from "@/components/typography";
import { User, UserPresenceType } from "@/generated/graphql";
import React from "react";

interface Props {
  serverUsers?: (User | null)[];
}

export const ServerUsers = ({ serverUsers }: Props) => {
  const calculateOnlineUsers = (): number => {
    let onlineUsers = 0;
    serverUsers?.forEach((user) => {
      if (user?.userPresence === UserPresenceType.Online) {
        onlineUsers += 1;
      }
    });
    return onlineUsers;
  };
  return (
    <div className="flex flex-row gap-md">
      <div className="flex flex-row gap-xs items-center justify-start">
        <div className="bg-green-500 w-3 h-3 rounded-full" />
        <Text>{calculateOnlineUsers()} Online</Text>
      </div>
      <div className="flex flex-row gap-xs items-center justify-start">
        <div className="bg-gray-500 w-3 h-3 rounded-full" />
        <Text>{serverUsers?.length} Members</Text>
      </div>
    </div>
  );
};
