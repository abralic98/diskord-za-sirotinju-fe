import { CurrentRoomHeader } from "@/features/dashboard/rooms/components/CurrentRoomHeader";
import { RoomMessages } from "@/features/dashboard/rooms/messages/RoomMessages";
import React from "react";

const RoomPage = async () => {
  return (
    <div className="w-full bg-sidebar-border">
      <CurrentRoomHeader />
      <RoomMessages />
    </div>
  );
};

export default RoomPage;
