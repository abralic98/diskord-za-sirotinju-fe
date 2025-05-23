import { Button } from "@/components/ui/button";
import {
  JoinServerWithInviteDocument,
  JoinServerWithInviteMutation,
  JoinServerWithInviteMutationVariables,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import routes from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const JoinServerByInvite = () => {
  const { replace } = useRouter();
  const { inviteToken } = useIds();
  const joinServerByInviteMutation = useMutation({
    mutationFn: async (data: JoinServerWithInviteMutationVariables) => {
      const res = await requestWithAuth<JoinServerWithInviteMutation>(
        JoinServerWithInviteDocument,
        data,
      );
      return res;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllUserServersSidebar],
      });
      replace(`${routes.dashboard}/${data.joinServerWithInvite?.id}`);
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
      replace(routes.dashboard);
    },
  });
  return (
    <Button
      onClick={() => {
        if (!inviteToken) return;
        joinServerByInviteMutation.mutateAsync({ token: inviteToken });
      }}
      isLoading={joinServerByInviteMutation.isPending}
      className="w-[150px]"
    >
      Join
    </Button>
  );
};
