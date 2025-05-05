import { Context } from "@/components/custom/context/Context";
import { H4, Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import { Room, RoomType } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import { AudioLines } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  room?: Room | null | undefined;
}
export const SingleRoom = ({ room }: Props) => {
  const { open } = useSidebar();
  const { push } = useRouter();
  const { serverId } = useIds();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const icon = room?.type === RoomType.Text ? <H4>#</H4> : <AudioLines />;

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => push(`${routes.dashboard}/${serverId}/${room?.id}`)}
      className={cn(
        open ? "justify-start" : "justify-center",
        "hover:bg-sidebar-hover w-full h-10 bg-sidebar-accent flex flex-row gap-md items-center p-3 rounded-md cursor-pointer ",
      )}
    >
      {icon}
      {open && <Text>{room?.name}</Text>}
    </div>
  );
};
