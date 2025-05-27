import { Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import { Room, RoomType, User } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { VoiceRoomUser } from "@/features/voice/components/VoiceRoomUser";
import { getRoomIcon } from "@/features/dashboard/rooms/helpers";
import { useVoiceRoomStore } from "../store";

interface Props {
  room?: Room | null | undefined;
  users?: User[];
}

export const SingleVoiceRoom = ({ room, users }: Props) => {
  const { open } = useSidebar();
  const { push } = useRouter();
  const { serverId, roomId } = useIds(); // from URL
  const { setIsUserInVoiceRoom } = useVoiceRoomStore();
  const isCurrentRoom = room?.id === roomId;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    if (!room) return;
    // Play the sound
    const audio = new Audio("/assets/sound/join-room.mp3");
    setIsUserInVoiceRoom(true);
    audio.play().catch((error) => {
      // console.error("Error playing the audio:", error);
    });

    // Navigate to the room
    push(`${routes.dashboard}/${serverId}/${room.id}`);
  };

  const renderUsers = () => {
    return users?.map((user) => <VoiceRoomUser key={user.id} user={user} />);
  };

  return (
    <div onContextMenu={handleContextMenu} onClick={handleClick}>
      <div
        className={cn(
          isCurrentRoom
            ? "bg-active-room hover:bg-active-room-hover"
            : "bg-sidebar-accent hover:bg-sidebar-hover",
          open ? "justify-start" : "justify-center",
          "w-full h-10 flex flex-row gap-md items-center p-3 rounded-md cursor-pointer",
        )}
      >
        {getRoomIcon({ room })}
        {open && <Text className="truncate max-w-full">{room?.name}</Text>}
      </div>
      <div className="flex flex-col gap-md pt-2 pb-2 bg-sidebar">
        {renderUsers()}
      </div>
    </div>
  );
};
