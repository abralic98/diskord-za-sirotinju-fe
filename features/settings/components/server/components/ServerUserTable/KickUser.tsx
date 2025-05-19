import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  KickUserFromServerDocument,
  KickUserFromServerMutation,
  KickUserFromServerMutationVariables,
  KickUserInput,
  User,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import React, { RefObject } from "react";
import { toast } from "sonner";

interface Props {
  user?: User | null;
  closeRef: RefObject<HTMLButtonElement | null>;
}
export const KickUser = ({ user, closeRef }: Props) => {
  const { serverSettingsId } = useIds();
  const createServerMutation = useMutation({
    mutationFn: async (data: KickUserInput) => {
      const modifiedData: KickUserFromServerMutationVariables = {
        input: data,
      };
      const res = await requestWithAuth<KickUserFromServerMutation>(
        KickUserFromServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("User kicked");
      closeRef.current?.click();
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, serverSettingsId],
      });
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const handleKick = () => {
    if (!serverSettingsId) return;
    if (!user?.id) return;
    createServerMutation.mutate({
      userId: user?.id,
      serverId: serverSettingsId,
    });
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-sm">
        <Text>Kick {user?.username} from server</Text>
        <Text className="font-medium">User will be able to join back</Text>
      </div>
      <div className="w-full flex flex-row gap-md items-center">
        <DialogClose>
          <Button type="button" className="w-[150px]">
            Cancel
          </Button>
        </DialogClose>
        <Button
          className="w-[150px]"
          variant="destructive"
          onClick={handleKick}
        >
          Kick
        </Button>
      </div>
    </div>
  );
};
