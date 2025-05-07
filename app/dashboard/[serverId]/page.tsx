import { NoRooms } from "@/features/dashboard/components/NoRooms";
import React from "react";

const ServerPage = async () => {
  return (
    <div className="w-full bg-sidebar-accent">
      <NoRooms />
    </div>
  );
};

export default ServerPage;
