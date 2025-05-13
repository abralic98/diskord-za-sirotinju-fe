"use client";

import { H4 } from "@/components/typography";
import { useAuthStore } from "@/features/auth/store";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import React from "react";
import { EditAccountBasicInfo } from "./EditAccountBasicInfo";
import { EditAvatar } from "./edit/EditAvatar";

export const AccountBasicInfo = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-[500px] min-h-[370px] bg-sidebar border border-sidebar p-10 rounded-xl flex flex-col gap-md">
      <div className="flex flex-row gap-md items-center justify-between">
        <div className="flex flex-row gap-md items-center">
          <UserAvatar userAvatar={user?.avatar} className="w-[70px] h-[70px]" />
          <H4>{user?.username}</H4>
        </div>
        <EditAvatar />
      </div>
      <EditAccountBasicInfo user={user} />
    </div>
  );
};
