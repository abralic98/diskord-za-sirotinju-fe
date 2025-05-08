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
  const [storeFetch, setStoreFetch] = useState(true);
  const { servers } = useServerListSidebarStore();
  useAuthenticator();

  useEffect(() => {
    if (roomId && serverId) return;
    const firstServer = servers?.[0];
    const id = firstServer?.id;
    if (!id) return;

    router.replace(`/dashboard/${id}`);
    setStoreFetch(false);
  }, [servers]);

  if (storeFetch) {
    return (
      <div className="p-[12px] w-full bg-sidebar-border">
        Redirecting to your first available server...
      </div>
    );
  }
  if (!storeFetch)
    return (
      <div className="bg-sidebar-border w-full">
        <NoServers />
      </div>
    );
};
