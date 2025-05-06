import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
      toggle: () => set((state) => ({ isOpen: !state.isOpen }), false, "toggleSidebar"),
    }),
    { name: "UserListSidebarStore" },
  )
);
