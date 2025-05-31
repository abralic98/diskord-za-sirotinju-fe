import { useEffect } from "react";
import { createClient, Client } from "graphql-ws";
import { useIds } from "@/hooks/useIds";
import { SubscribeToMessagesByRoomIdDocument } from "@/generated/graphql";
import { getCookie } from "cookies-next/client";
import { CookieKeys } from "@/helpers/cookies";

export const useRoomMessageConnection = (onMessage: (msg: any) => void) => {
  const { roomId } = useIds();
  const token = getCookie(CookieKeys.TOKEN);

  useEffect(() => {
    if (!roomId) return;

    // create the client
    const client: Client = createClient({
      url: `${process.env.NEXT_PUBLIC_WS_URL}?room/${roomId}`,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      lazy: false,
      retryAttempts: 0, // avoid reconnect loop
    });

    // subscribe
    const disposeSubscribe = client.subscribe(
      {
        query: SubscribeToMessagesByRoomIdDocument,
        variables: { roomId: String(roomId) },
      },
      {
        next: (data) => {
          if (data.data?.subscribeToMessagesByRoomId) {
            onMessage(data.data.subscribeToMessagesByRoomId);
          }
        },
        error: (err) => {
          console.error("Subscription error:", err);
        },
        complete: () => {
          console.log("Subscription complete");
        },
      },
    );

    // cleanup
    return () => {
      disposeSubscribe(); // Unsubscribe from query
      client.dispose(); // Fully close WebSocket connection
    };
  }, [roomId]);
};
