import { Button } from "@/components/ui/button";
import {
  BannedUser,
  UnbanUserFromServerDocument,
  UnbanUserFromServerMutation,
  UnbanUserFromServerMutationVariables,
  UnbanUserInput,
  User,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export const UnbanUser = ({ user }: { user?: BannedUser | null }) => {
  const { serverSettingsId } = useIds();
  const unbanUserMutation = useMutation({
    mutationFn: async (data: UnbanUserInput) => {
      const modifiedData: UnbanUserFromServerMutationVariables = {
        input: data,
      };
      const res = await requestWithAuth<UnbanUserFromServerMutation>(
        UnbanUserFromServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("User Unbanned");
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, serverSettingsId],
      });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getBannedUsersByServerId, serverSettingsId],
      });
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const handleUnban = () => {
    if (!serverSettingsId) return;
    if (!user?.user.id) return;

    const data: UnbanUserInput = {
      serverId: serverSettingsId,
      userId: user.user.id,
    };
    unbanUserMutation.mutateAsync(data);
  };
  return (
    <div>
      <Button onClick={handleUnban} variant={"destructive"}>
        Unban
      </Button>
    </div>
  );
};
