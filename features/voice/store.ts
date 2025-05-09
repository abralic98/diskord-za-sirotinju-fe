import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Room } from "@/generated/graphql";

interface VoiceRoomStore {
  currentJoinedVoiceRoom?: Room;
  setCurrentJoinedVoiceRoom: (room: Room) => void;
  leaveVoiceRoom: () => void;
  switchVoiceRoom: (room: Room) => void;
}

export const useVoiceRoomStore = create<VoiceRoomStore>()(
  devtools(
    (set, get) => ({
      currentJoinedVoiceRoom: undefined,

      setCurrentJoinedVoiceRoom: (room) =>
        set(
          { currentJoinedVoiceRoom: room },
          false,
          "setCurrentJoinedVoiceRoom",
        ),

      leaveVoiceRoom: () =>
        set({ currentJoinedVoiceRoom: undefined }, false, "leaveVoiceRoom"),

      switchVoiceRoom: (room) => {
        const current = get().currentJoinedVoiceRoom;
        if (current?.id !== room.id) {
          // Optionally: call a `disconnectFromVoiceRoom(current)` here
          set({ currentJoinedVoiceRoom: room }, false, "switchVoiceRoom");
        }
      },
    }),
    { name: "VoiceRoomStore" },
  ),
);
