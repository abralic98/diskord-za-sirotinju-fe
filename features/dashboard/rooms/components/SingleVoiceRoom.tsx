import { Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import { Room, RoomType, User } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getRoomIcon } from "../helpers";
import { useAuthStore } from "@/features/auth/store";

interface Props {
  room?: Room | null | undefined;
  users?: User[];
}

export const SingleVoiceRoom = ({ room, users }: Props) => {
  const { open } = useSidebar();
  const { push } = useRouter();
  const { user } = useAuthStore();
  const { serverId, roomId } = useIds(); // from URL
  const isCurrentRoom = room?.id === roomId;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    if (!room) return;
    push(`${routes.dashboard}/${serverId}/${room.id}`);
  };

  const renderUsers = () => {
    return users?.map((user) => (
      <div key={user.id} className="user-item">
        <Text>{user.username}</Text>
      </div>
    ));
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
      <div className="flex flex-col gap-md bg-green-900">{renderUsers()}</div>
    </div>
  );
};
