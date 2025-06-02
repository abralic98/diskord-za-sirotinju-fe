"use client";
import { H3 } from "@/components/typography";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth/store";
import { UserInfoFooter } from "@/features/user/UserInfoFooter";
import {
  GetServerNameByIdDocument,
  GetServerNameByIdQuery,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import routes from "@/lib/routes";
import { useQuery } from "@tanstack/react-query";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  content: ReactNode;
}
export const RoomServerSidebar = ({ content }: Props) => {
  const { open } = useSidebar();
  const { serverId } = useIds();
  const { user } = useAuthStore();

  const { data: server } = useQuery({
    queryKey: [queryKeys.getServerById, serverId],
    enabled: Boolean(serverId),
    queryFn: async (): Promise<GetServerNameByIdQuery> => {
      return await requestWithAuth<GetServerNameByIdQuery>(
        GetServerNameByIdDocument,
        {
          id: serverId,
        },
      );
    },
  });

  const name = server?.getServerById?.name;
  const showSettings =
    server?.getServerById?.id &&
    server.getServerById.createdBy?.id === user?.id;

  const serverName = open ? name : name?.slice(0, 2);
  return (
    <Sidebar collapsible="icon" className="relative h-full">
      <SidebarHeader className="h-20 flex items-start justify-center">
        <div className="flex flex-row gap-md w-full items-center justify-between">
          <H3>{serverName}</H3>
          {showSettings && (
            <Link href={`${routes.serverSettings}/${server.getServerById?.id}`}>
              <SettingsIcon className="cursor-pointer hover:animate-spin" />
            </Link>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>{content}</SidebarContent>
      <SidebarFooter>
        <UserInfoFooter />
      </SidebarFooter>
      <div className="absolute right-0 top-0">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};
