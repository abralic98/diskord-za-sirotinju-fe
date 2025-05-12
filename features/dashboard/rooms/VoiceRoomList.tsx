import { Room } from "@/generated/graphql";
import React from "react";
import { SingleVoiceRoom } from "./components/SingleVoiceRoom";
import { useVoiceConnection } from "@/features/voice/hooks/useVoiceConnection";
import { useVoiceRoomStore } from "@/features/voice/store";

interface Props {
  rooms?: (Room | null)[];
}

export const VoiceRoomList = ({ rooms }: Props) => {
  useVoiceConnection();
  const roomUsers = useVoiceRoomStore((s) => s.roomUsers);

  if (!rooms) return null;

  return (
    <div>
      {rooms.map((room) => {
        if (!room) return null;

        const users = roomUsers[room.id] ?? [];
        return <SingleVoiceRoom key={room.id} room={room} users={users} />;
      })}
    </div>
  );
};
