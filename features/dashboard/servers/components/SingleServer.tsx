import React from "react";
import { Server } from "@/generated/graphql";
import { H4 } from "@/components/typography";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useIds } from "@/hooks/useIds";
import { useUserListSidebarStore } from "../store";
import { useVoiceRoomStore } from "@/features/voice/store";
import { useAuthStore } from "@/features/auth/store";
import Image from "next/image";

type SidebarServer = Omit<Server, "createdBy" | "rooms" | "users">;

interface Props {
  server?: SidebarServer | null;
}

export const SingleServer = ({ server }: Props) => {
  const { push } = useRouter();
  const { serverId } = useIds();
  const { close } = useUserListSidebarStore();
  const { user } = useAuthStore();
  const { removeUserFromAllRooms } = useVoiceRoomStore();

  if (!server) return null;

  const isServerSelected = server.id === serverId;

  const renderIcon = () => {
    if (server?.serverImg) {
      return <Image alt="server icon" fill src={server.serverImg} />;
    } else {
      if (server?.name) return <H4>{server?.name.slice(0, 2)}</H4>;
    }
  };
  return (
    <div
      onClick={() => {
        close();
        removeUserFromAllRooms(String(user?.id));

        push(`${routes.dashboard}/${server.id}`);
      }}
      className={cn(
        isServerSelected
          ? "rounded-xl bg-sidebar-hover"
          : "rounded-full bg-sidebar-accent",
        "hover:bg-sidebar-hover transition-colors duration-200 flex items-center justify-center w-14 h-14 cursor-pointer overflow-hidden relative",
      )}
    >
      {renderIcon()}
    </div>
  );
};
