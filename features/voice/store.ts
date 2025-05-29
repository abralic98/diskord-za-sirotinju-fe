import { Room } from "@/generated/graphql";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface VoiceRoomState {
  roomUsers: Record<string, string[]>;
  addUserToRoom: (roomId: string, userId: string) => void;
  removeUserFromRoom: (roomId: string, userId: string) => void;
  setUsersInRoom: (roomId: string, userIds: string[]) => void;
  removeUserFromAllRooms: (userId: string) => void;
  isUserInVoiceRoom: boolean;
  setIsUserInVoiceRoom: (voice: boolean) => void;
  handleLeaveRoom: (roomId: string, userId: string) => void;
}

export const useVoiceRoomStore = create<VoiceRoomState>()(
  devtools(
    (set) => ({
      roomUsers: {},
      isUserInVoiceRoom: false,
      setIsUserInVoiceRoom: (voice) =>
        set(
          () => ({ isUserInVoiceRoom: voice }),
          false,
          "setIsUserInVoiceRoom",
        ),
      addUserToRoom: (roomId, userId) =>
        set(
          (state) => {
            const users = new Set(state.roomUsers[roomId] ?? []);
            users.add(userId);
            return {
              roomUsers: {
                ...state.roomUsers,
                [roomId]: Array.from(users),
              },
            };
          },
          false,
          "addUserToRoom",
        ),
      removeUserFromRoom: (roomId, userId) =>
        set(
          (state) => {
            const users = new Set(state.roomUsers[roomId] ?? []);
            users.delete(userId);
            return {
              roomUsers: {
                ...state.roomUsers,
                [roomId]: Array.from(users),
              },
            };
          },
          false,
          "removeUserFromRoom",
        ),
      setUsersInRoom: (roomId, userIds) =>
        set(
          (state) => ({
            roomUsers: {
              ...state.roomUsers,
              [roomId]: userIds,
            },
          }),
          false,
          "setUsersInRoom",
        ),
      removeUserFromAllRooms: (userId) =>
        set(
          (state) => {
            const updatedRoomUsers = Object.fromEntries(
              Object.entries(state.roomUsers).map(([roomId, users]) => [
                roomId,
                users.filter((user) => user !== userId),
              ]),
            );
            return { roomUsers: updatedRoomUsers };
          },
          false,
          "removeUserFromAllRooms",
        ),
      handleLeaveRoom: (roomId, userId) =>
        set(
          (state) => {
            const updatedRoomUsers = { ...state.roomUsers };
            updatedRoomUsers[roomId] = updatedRoomUsers[roomId]?.filter(
              (user) => user !== userId,
            );
            return {
              roomUsers: updatedRoomUsers,
              isUserInVoiceRoom: false,
            };
          },
          false,
          "handleLeaveRoom",
        ),
    }),
    { name: "VoiceRoomStore" },
  ),
);
