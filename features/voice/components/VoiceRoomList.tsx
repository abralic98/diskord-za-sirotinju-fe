import { Room, User } from "@/generated/graphql";
import React from "react";
import { useVoiceConnection } from "@/features/voice/hooks/useVoiceConnection";
import { useVoiceRoomStore } from "@/features/voice/store";
import { SingleVoiceRoom } from "./SingleVoiceRoom";

interface Props {
  rooms?: (Room | null)[];
}

export const VoiceRoomList = ({ rooms }: Props) => {
  useVoiceConnection();
  const roomUsers = useVoiceRoomStore((s) => s.roomUsers);

  if (!rooms) return null;
  console.log(roomUsers, "room users")

  return (
    <div className="flex flex-col">
      {rooms.map((room) => {
        if (!room) return null;
        const users = roomUsers[room.id] as User[] ?? [];
        return <SingleVoiceRoom key={room.id} room={room} users={users} />;
      })}
    </div>
  );
};
