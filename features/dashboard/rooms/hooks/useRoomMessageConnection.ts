import { useEffect } from "react";
import { createClient } from "graphql-ws";
import { useIds } from "@/hooks/useIds";

export const useRoomMessageConnection = (onMessage: (msg: any) => void) => {
  const { roomId } = useIds();

  useEffect(() => {
    if (!roomId) return;

    const client = createClient({
      url: "ws://localhost:8080/graphql", // must match server URL
    });

    const dispose = client.subscribe(
      {
        query: `
          subscription($roomId: ID!) {
            messageAdded(roomId: $roomId) {
              id
              text
              dateCreated
              author {
                username
                avatar
              }
            }
          }
        `,
        variables: {
          roomId: String(roomId),
        },
      },
      {
        next: (data) => {
          console.log("📨 New data:", data);
          if (data.data?.messageAdded) {
            onMessage(data.data.messageAdded);
          }
        },
        error: (err) => {
          console.error("❌ Subscription error", err);
        },
        complete: () => {
          console.warn(
            "⚠️ Subscription completed — this should NOT happen unless Flux completes.",
          );
        },
      },
    );

    return () => {
      dispose(); // properly close on unmount
    };
  }, [roomId, ]);
};
