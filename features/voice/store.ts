import { create } from "zustand";

interface VoiceRoomState {
  roomUsers: Record<string, string[]>;
  addUserToRoom: (roomId: string, userId: string) => void;
  removeUserFromRoom: (roomId: string, userId: string) => void;
  setUsersInRoom: (roomId: string, userIds: string[]) => void;
}

export const useVoiceRoomStore = create<VoiceRoomState>((set) => ({
  roomUsers: {},
  addUserToRoom: (roomId, userId) =>
    set((state) => {
      const users = new Set(state.roomUsers[roomId] ?? []);
      users.add(userId);
      return {
        roomUsers: {
          ...state.roomUsers,
          [roomId]: Array.from(users),
        },
      };
    }),
  removeUserFromRoom: (roomId, userId) =>
    set((state) => {
      const users = new Set(state.roomUsers[roomId] ?? []);
      users.delete(userId);
      return {
        roomUsers: {
          ...state.roomUsers,
          [roomId]: Array.from(users),
        },
      };
    }),
  setUsersInRoom: (roomId, userIds) =>
    set((state) => ({
      roomUsers: {
        ...state.roomUsers,
        [roomId]: userIds,
      },
    })),
}));
