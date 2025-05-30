import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserListSidebarStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useDMUserListSidebarStore = create<UserListSidebarStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      toggle: () =>
        set((state) => ({ isOpen: !state.isOpen }), false, "toggleDmSidebar"),
    }),
    { name: "DMUsersSidebar" },
  ),
);
