import { CurrentRoomHeader } from "@/features/dashboard/rooms/components/CurrentRoomHeader";
import { RoomMessages } from "@/features/dashboard/rooms/messages/RoomMessages";
import { CustomPageProps } from "@/helpers/types";
import React from "react";

const RoomPage = async (props: CustomPageProps) => {
  const { roomId } = await props.params;
  return (
    <div className="w-full bg-sidebar-border">
      <CurrentRoomHeader roomId={roomId} />
      <RoomMessages roomId={roomId} />
    </div>
  );
};

export default RoomPage;
