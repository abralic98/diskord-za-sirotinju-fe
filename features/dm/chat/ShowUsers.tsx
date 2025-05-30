import { UsersIcon } from "lucide-react";
import React from "react";
import { useDMUserListSidebarStore } from "../store";

export const ShowUsers = () => {
  const { toggle } = useDMUserListSidebarStore();
  return <UsersIcon onClick={toggle} className="cursor-pointer" />;
};
