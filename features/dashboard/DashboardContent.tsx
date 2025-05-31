"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useServerListSidebarStore } from "./servers/store";
import { useIds } from "@/hooks/useIds";
import { NoServers } from "./components/NoServers";
import { useAuthenticator } from "@/hooks/useAuthenticator";

export const DashboardContent = () => {
  const router = useRouter();
  const { serverId, roomId } = useIds();
  const { servers } = useServerListSidebarStore();
  useAuthenticator();

  const [loading, setLoading] = useState(true);
  const hasServers = Boolean(servers && servers.length);

  useEffect(() => {
    if (roomId && serverId) {
      setLoading(false);
      return;
    }

    const firstServer = servers[0];
    if (firstServer?.id) {
      router.replace(`/dashboard/${firstServer.id}`);
    }

    setLoading(false);
  }, [servers, serverId, roomId]);

  if (loading) {
    return (
      <div className="p-[12px] w-full bg-sidebar-border">
        Redirecting to your first available server...
      </div>
    );
  }

  if (!hasServers) {
    return (
      <div className="bg-sidebar-border w-full">
        <NoServers />
      </div>
    );
  }

  return null;
};
