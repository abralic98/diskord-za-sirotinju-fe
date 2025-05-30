import { useEffect } from "react";
import { createClient } from "graphql-ws";
import { useIds } from "@/hooks/useIds";
import { SubscribeToMessagesByRoomIdDocument } from "@/generated/graphql";

export const useRoomMessageConnection = (onMessage: (msg: any) => void) => {
  const { roomId } = useIds();

  useEffect(() => {
    if (!roomId) return;

    const client = createClient({
      url: `ws://localhost:8080/graphql?room/${roomId}`,
    });

    const dispose = client.subscribe(
      {
        query: SubscribeToMessagesByRoomIdDocument,
        variables: {
          roomId: String(roomId),
        },
      },
      {
        next: (data) => {
          if (data.data?.subscribeToMessagesByRoomId) {
            onMessage(data.data.subscribeToMessagesByRoomId);
          }
        },
        error: (err) => {
          // console.error("Subscription error", err);
        },
        complete: () => {
          console.log("complet");
        },
      },
    );

    return () => {
      dispose(); 
    };
  }, [roomId]);
};
