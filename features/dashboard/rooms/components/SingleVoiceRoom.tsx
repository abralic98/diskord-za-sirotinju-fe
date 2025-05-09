import { Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import { Room, RoomType } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getRoomIcon } from "../helpers";
import { useVoiceConnection } from "@/features/voice/hooks/useVoiceConnection";
import { useAuthStore } from "@/features/auth/store";
import { useVoiceRoomStore } from "@/features/voice/store";

interface Props {
  room?: Room | null | undefined;
}

export const SingleVoiceRoom = ({ room }: Props) => {
  const { open } = useSidebar();
  const { switchVoiceRoom } = useVoiceRoomStore();
  const { push } = useRouter();
  const { user } = useAuthStore();
  const { serverId, roomId } = useIds(); // from URL
  const isCurrentRoom = room?.id === roomId;

  const { remoteAudio } = useVoiceConnection(
    room?.id,
    user?.id ?? "anon",
    room?.type === RoomType.Voice,
    isCurrentRoom,
  );

  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  console.log(remoteAudio, 'remote audio')

  const handleClick = () => {
    if (!room) return;
    switchVoiceRoom(room);
    push(`${routes.dashboard}/${serverId}/${room.id}`);
  };

  const renderUsers = () => {

  }

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleClick}
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
      <div>

      </div>
    </div>
  );
};

