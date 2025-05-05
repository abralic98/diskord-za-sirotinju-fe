import { H4 } from "@/components/typography";
import { Room, RoomType } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import routes from "@/lib/routes";
import { AudioLines } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  room?: Room | null | undefined;
}
export const SingleRoom = ({ room }: Props) => {
  const { push } = useRouter();
  const { serverId } = useIds();

  const icon = room?.type === RoomType.Text ? <H4>#</H4> : <AudioLines />;

  return (
    <div
      onClick={() => push(`${routes.dashboard}/${serverId}/${room?.id}`)}
      className="hover:bg-sidebar-hover w-full h-10 bg-sidebar-accent flex flex-row gap-md items-center justify-start p-3 rounded-md cursor-pointer "
    >
      {icon}
      {room?.name}
    </div>
  );
};
