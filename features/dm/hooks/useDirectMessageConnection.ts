import { useEffect } from "react";
import { createClient, Client } from "graphql-ws";
import { useIds } from "@/hooks/useIds";
import { SubscribeToMessagesByInboxIdDocument } from "@/generated/graphql";
import { getCookie } from "cookies-next/client";
import { CookieKeys } from "@/helpers/cookies";
import { apiUrl } from "@/lib/graphql/client";

export const useDirectMessageConnection = (onMessage: (msg: any) => void) => {
  const { inboxId } = useIds();
  const token = getCookie(CookieKeys.TOKEN);

  useEffect(() => {
    if (!inboxId) return;

    const client: Client = createClient({
      url: `${apiUrl}?inbox/${inboxId}`,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      lazy: false, 
      retryAttempts: 0, 
    });

    const disposeSubscribe = client.subscribe(
      {
        query: SubscribeToMessagesByInboxIdDocument,
        variables: {
          inboxId,
        },
      },
      {
        next: (data) => {
          if (data.data?.subscribeToMessagesByInboxId) {
            onMessage(data.data.subscribeToMessagesByInboxId);
          }
        },
        error: (err) => {
          console.error("Subscription error (inbox):", err);
        },
        complete: () => {
          console.log("Direct message subscription complete");
        },
      },
    );

    return () => {
      disposeSubscribe(); // clean up subscription
      client.dispose(); // close socket connection properly
    };
  }, [inboxId]);
};

