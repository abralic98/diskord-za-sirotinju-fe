import { useEffect } from "react";
import { createClient } from "graphql-ws";
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

    const client = createClient({
      url: `${apiUrl}?inbox/${inboxId}`,
      connectionParams: () => {
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
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
