import { useEffect } from "react";
import { createClient } from "graphql-ws";
import { useIds } from "@/hooks/useIds";
import { SubscribeToMessagesByInboxIdDocument } from "@/generated/graphql";

export const useDirectMessageConnection = (onMessage: (msg: any) => void) => {
  const { inboxId } = useIds();

  useEffect(() => {
    if (!inboxId) return;

    const client = createClient({
      url: `ws://localhost:8080/graphql?inbox/${inboxId}`,
    });

    const dispose = client.subscribe(
      {
        query: SubscribeToMessagesByInboxIdDocument,
        variables: {
          inboxId: inboxId,
        },
      },
      {
        next: (data) => {
          if (data.data?.subscribeToMessagesByInboxId) {
            onMessage(data.data.subscribeToMessagesByInboxId);
          }
        },
        error: (err) => {
          // console.error(err);
        },
        complete: () => {
          // console.log("done");
        },
      },
    );

    return () => {
      dispose();
    };
  }, [inboxId]);
};
