import { Button } from "@/components/ui/button";
import {
  DeleteServerDocument,
  DeleteServerMutation,
  DeleteServerMutationVariables,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import routes from "@/lib/routes";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const DeleteServer = () => {
  const { serverSettingsId } = useIds();
  const { replace } = useRouter();

  const deleteServerMutation = useMutation({
    mutationFn: async () => {
      if (!serverSettingsId) return;
      const modifiedData: DeleteServerMutationVariables = {
        serverId: serverSettingsId,
      };
      const res = await requestWithAuth<DeleteServerMutation>(
        DeleteServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("Server Deleted!");
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllUserServersSidebar],
      });
      replace(routes.discover);
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });
  return (
    <div className="flex flex-row justify-between">
      <DialogClose>
        <Button className="w-[150px]">Cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button
          onClick={() => {
            deleteServerMutation.mutateAsync();
          }}
          className="w-[150px]"
          variant={"destructive"}
        >
          Delete
        </Button>
      </DialogClose>
    </div>
  );
};
