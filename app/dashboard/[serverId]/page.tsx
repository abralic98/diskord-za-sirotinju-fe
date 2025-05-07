import { NoRooms } from "@/features/dashboard/components/NoRooms";
import { CustomPageProps } from "@/helpers/types";
import React from "react";

const ServerPage = async (props: CustomPageProps) => {
  const { serverId } = await props.params;
  return (
    <div className="w-full bg-sidebar-accent">
      <NoRooms />
    </div>
  );
};

export default ServerPage;
