import React from "react";
import { useAuthStore } from "../auth/store";
import { UserAvatar } from "./components/UserAvatar";
import { UserInfo } from "./components/UserInfo";
import { UserOptions } from "./components/UserOptions";
import { useSidebar } from "@/components/ui/sidebar";

export const UserInfoFooter = () => {
  const { user } = useAuthStore();
  const { open } = useSidebar();
  return (
    <div className="bg-sidebar border border-sidebar-accent w-full h-15 flex flex-row gap-md items-center justify-between p-2">
      <div className="flex flex-row gap-md justify-start items-center">
        <UserAvatar />
        {open && <UserInfo user={user} />}
      </div>
      {open && <UserOptions />}
    </div>
  );
};
