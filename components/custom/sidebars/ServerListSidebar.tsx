import { ServerList } from "@/features/dashboard/servers/ServerList";
import React from "react";

export const ServerListSidebar = () => {
  return (
    <div className="w-[75px] pl-2 pr-2 bg-sidebar flex items-center justify-center pt-[12px] pb-[12px] h-full">
      <ServerList />
    </div>
  );
};
