import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Room, Rooms } from "@/generated/graphql";

interface RoomListSidebarStore {
  rooms: Rooms;
  setRooms: (rooms?: Rooms) => void;
  addRoom: (room: Room, type: "text" | "voice") => void;
  removeRoom: (roomId: string, type: "text" | "voice") => void;
}

export const useRoomListSidebarStore = create<RoomListSidebarStore>()(
  devtools(
    (set) => ({
      rooms: { text: [], voice: [] },
      setRooms: (rooms) =>
        set({ rooms: rooms ?? { text: [], voice: [] } }, false, "setRoomList"),
      addRoom: (room, type) =>
        set(
          (state) => ({
            rooms: {
              ...state.rooms,
              [type]: [...(state.rooms[type] || []), room],
            },
          }),
          false,
          "addRoom",
        ),
      removeRoom: (roomId, type) =>
        set(
          (state) => ({
            rooms: {
              ...state.rooms,
              [type]: (state.rooms[type] || []).filter((r) => r?.id !== roomId),
            },
          }),
          false,
          "removeRoom",
        ),
    }),
    { name: "RoomListSidebarStore" },
  ),
);

