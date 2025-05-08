import { Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import { Room } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { getRoomIcon } from "../helpers";
import { useUserListSidebarStore } from "../../servers/store";

interface Props {
  room?: Room | null | undefined;
}
export const SingleRoom = ({ room }: Props) => {
  const { open } = useSidebar();
  const { close } = useUserListSidebarStore();
  const { push } = useRouter();
  const { serverId, roomId } = useIds();

  const currentRoom = roomId === room?.id;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => {
        close();
        push(`${routes.dashboard}/${serverId}/${room?.id}`);
      }}
      className={cn(
        currentRoom
          ? "bg-active-room hover:bg-active-room-hover"
          : "bg-sidebar-accent hover:bg-sidebar-hover",
        open ? "justify-start" : "justify-center",
        " w-full h-10  flex flex-row gap-md items-center p-3 rounded-md cursor-pointer ",
      )}
    >
      {getRoomIcon({ room: room })}
      {open && <Text className="truncate max-w-full">{room?.name}</Text>}
    </div>
  );
};
