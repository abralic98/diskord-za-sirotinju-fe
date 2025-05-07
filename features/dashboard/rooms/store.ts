import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Room } from "@/generated/graphql";

interface RoomListSidebarStore {
  rooms: (Room | null)[];
  setRooms: (rooms?: (Room | null)[] ) => void;
  addRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
  currentRoom?: Room;
  setCurrentRoom: (room: Room) => void;
}

export const useRoomListSidebarStore = create<RoomListSidebarStore>()(
  devtools(
    (set) => ({
      roomList: [],
      setRooms: (rooms) =>
        set({ rooms: rooms ?? [] }, false, "setRoomList"),
      addRoom: (room) =>
        set((state) => ({ rooms: [...state.rooms, room] }), false, "addRoom"),
      removeRoom: (roomId) =>
        set(
          (state) => ({
            rooms: state.rooms.filter((r) => r?.id !== roomId),
          }),
          false,
          "removeRoom",
        ),
      currentRoom: undefined,
      setCurrentRoom: (room) =>
        set({ currentRoom: room }, false, "setCurrentRoom"),
    }),
    { name: "RoomListSidebarStore" },
  ),
);
