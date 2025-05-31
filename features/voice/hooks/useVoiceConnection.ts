import { useEffect, useRef } from "react";
import { useAuthStore } from "@/features/auth/store";
import { useIds } from "@/hooks/useIds";
import { useRtc } from "./useRtc";
import { useVoiceRoomStore } from "../store";

export const useVoiceConnection = () => {
  const { user } = useAuthStore();
  const { roomId } = useIds();
  const { createPeerConnection, handleSocketMessage, getMicrophoneStream } =
    useRtc();

  const {
    addUserToRoom,
    setUsersInRoom,
    removeUserFromRoom,
    isUserInVoiceRoom,
  } = useVoiceRoomStore();

  const socketRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const start = async () => {
      const url = process.env.NEXT_PUBLIC_VOICE_URL;
      if (!url) return;
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = async () => {
        if (!isUserInVoiceRoom) return;
        if (!roomId) return;

        // Get microphone stream
        const stream = await getMicrophoneStream();
        if (!stream) return;

        localStreamRef.current = stream;

        // Create peer connection with ICE servers
        const pc = createPeerConnection(socket, roomId, String(user.id));
        pcRef.current = pc;

        // Add tracks to connection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
          // console.log(`Added ${track.kind} track to peer connection`);
        });

        // Join the room
        socket.send(
          JSON.stringify({
            type: "join",
            room: roomId,
            sender: { id: user.id },
          }),
        );
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log("📨 Message received:", data);

        if (data.type === "presence") {
          const { room, users } = data;
          if (room && Array.isArray(users)) {
            setUsersInRoom(room, users);
          }
        } else {
          handleSocketMessage(
            data,
            pcRef.current,
            socketRef.current,
            String(user.id),
            String(roomId),
          );
        }
      };

      socket.onclose = () => {
        // console.log("❌ Socket closed");
        removeUserFromRoom(String(roomId), String(user.id));
      };

      socket.onerror = (err) => {
        // console.error("❗ Socket error", err);
      };
    };

    start();

    return () => {
      // console.log("Cleaning up voice connection");
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
      pcRef.current?.close();
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      if (roomId && user?.id) {
        removeUserFromRoom(roomId, user.id);
      }
    };
  }, [user?.id, roomId]);

  return {};
};
