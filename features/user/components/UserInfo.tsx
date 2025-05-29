import { H4, Text } from "@/components/typography";
import { User } from "@/generated/graphql";
import React from "react";

interface Props {
  user: User | null;
}
export const UserInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-col gap-xs">
      <Text>{user?.username ?? "No user"}</Text>
      <Text>{user?.userPresence?.toLowerCase()}</Text>
    </div>
  );
};
