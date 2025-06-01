"use client";

import React from "react";
import {
  JoinServerDocument,
  JoinServerMutation,
  JoinServerMutationVariables,
  Server,
} from "@/generated/graphql";
import { H4, Text } from "@/components/typography";
import { ServerUsers } from "./ServerUsers";
import { Button } from "@/components/ui/button";
import { ServerImage } from "./ServerImage";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";

interface Props {
  server: Server;
}
export const SingleServer = ({ server }: Props) => {
  const { push } = useRouter();
  const joinServerMutation = useMutation({
    mutationFn: async (data: JoinServerMutationVariables) => {
      const res = await requestWithAuth<JoinServerMutation>(
        JoinServerDocument,
        data,
      );
      return res;
    },
    onSuccess: (data) => {
      if (data.joinServer?.id) {
        push(`${routes.dashboard}/${data.joinServer.id}`);
      }
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(`${err.response.errors[0].message} Redirecting ...`);
      push(`${routes.dashboard}/${server.id}`);
    },
  });

  const joinServer = () => {
    if (!server.id) return null;
    joinServerMutation.mutateAsync({
      input: {
        id: server.id,
      },
    });
  };

  return (
    <div className="w-[320px] h-[400px] bg-sidebar-accent rounded-lg">
      <ServerImage server={server} />
      <div className="p-4 flex flex-col gap-md mt-[50px]">
        <H4>{server.name}</H4>
        <ServerUsers serverUsers={server.joinedUsers ?? []} />
        <Text className="h-[70px] break-words whitespace-pre-wrap">
          {server.description}
        </Text>
        <Button type="button" onClick={() => joinServer()}>
          Join server
        </Button>
      </div>
    </div>
  );
};
