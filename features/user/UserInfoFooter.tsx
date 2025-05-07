import React from "react";
import { useAuthStore } from "../auth/store";
import { UserAvatar } from "./components/UserAvatar";
import { UserInfo } from "./components/UserInfo";
import { UserOptions } from "./components/UserOptions";

export const UserInfoFooter = () => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div className="bg-sidebar border border-sidebar-accent w-full h-15 flex flex-row gap-md items-center justify-between p-2">
      <div className="flex flex-row gap-md justify-start items-center">
        <UserAvatar />
        <UserInfo user={user} />
      </div>
      <UserOptions />
    </div>
  );
};
