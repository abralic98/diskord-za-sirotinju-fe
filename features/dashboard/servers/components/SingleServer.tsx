import React from "react";
import { Server } from "@/generated/graphql";
import { H4 } from "@/components/typography";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useIds } from "@/hooks/useIds";

type SidebarServer = Omit<Server, "createdBy" | "rooms" | "users">;

interface Props {
  server?: SidebarServer | null;
}

export const SingleServer = ({ server }: Props) => {
  const { push } = useRouter();
  const { serverId } = useIds();

  if (!server) return null;

  const isServerSelected = server.id === serverId;
  return (
    <div
      onClick={() => push(`${routes.dashboard}/${server.id}`)}
      className={cn(
        isServerSelected
          ? "rounded-xl bg-sidebar-hover"
          : "rounded-full bg-sidebar-accent",
        "hover:bg-sidebar-hover transition-colors duration-200  flex items-center justify-center w-14 h-14 cursor-pointer",
      )}
    >
      <H4>{server.name.slice(0, 2)}</H4>
    </div>
  );
};
