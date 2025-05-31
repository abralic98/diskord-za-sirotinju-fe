import { useEffect, useRef } from "react";
import { useVoiceRoomStore } from "../store";
import { useAuthStore } from "@/features/auth/store";

export const useGetRoomPresence = () => {
  const { user } = useAuthStore();
  const socketRef = useRef<WebSocket | null>(null);

  const { addUserToRoom, setUsersInRoom, removeUserFromRoom } =
    useVoiceRoomStore();

  useEffect(() => {
    if (!user?.id) return;

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_VOICE_URL}?server_presence`,
    );
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "getPresence",
          room: "all",
          sender: { id: user.id },
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "presence") {
        const { room, users } = data;
        if (room && Array.isArray(users)) {
          setUsersInRoom(room, users);
        }
      }
    };

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [user?.id]);
};
