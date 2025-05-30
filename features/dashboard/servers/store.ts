import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Server } from "@/generated/graphql";

interface UserListSidebarStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useUserListSidebarStore = create<UserListSidebarStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }, false, "openSidebar"),
      close: () => set({ isOpen: false }, false, "closeSidebar"),
      toggle: () =>
        set((state) => ({ isOpen: !state.isOpen }), false, "toggleSidebar"),
    }),
    { name: "UserListSidebarStore" },
  ),
);

interface ServerListSidebarStore {
  servers: (Server | null)[];
  setServers: (servers?: (Server | null)[]) => void;
  addServer: (server: Server) => void;
  removeServer: (serverId: string) => void;
  currentServer?: Server | null;
  setCurrentServer: (server: Server) => void;
}

export const useServerListSidebarStore = create<ServerListSidebarStore>()(
  devtools(
    (set) => ({
      servers: [],
      setServers: (servers) =>
        set({ servers: servers ?? [] }, false, "setServers"),
      addServer: (server) =>
        set(
          (state) => ({ servers: [...state.servers, server] }),
          false,
          "addServer",
        ),
      removeServer: (serverId) =>
        set(
          (state) => ({
            servers: state.servers.filter((s) => s?.id !== serverId),
          }),
          false,
          "removeServer",
        ),
      currentServer: undefined,
      setCurrentServer: (server) =>
        set({ currentServer: server }, false, "setCurrentServer"),
    }),
    { name: "ServerListSidebarStore" },
  ),
);
