import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  RemoveMeFromInboxDocument,
  RemoveMeFromInboxMutation,
  RemoveMeFromInboxMutationVariables,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import routes from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const DeleteDM = () => {
  const { inboxId } = useIds();
  const { replace } = useRouter();
  const header: CustomDialogProps["header"] = {
    title: "Are you sure you want to delete this chat",
    description: "Messages will be deleted",
  };

  const removeMeFromInbox = useMutation({
    mutationFn: async () => {
      if (!inboxId) return;
      const modifiedData: RemoveMeFromInboxMutationVariables = {
        inboxId: inboxId,
      };
      const res = await requestWithAuth<RemoveMeFromInboxMutation>(
        RemoveMeFromInboxDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.getMyInbox],
      });
      replace(routes.dm);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });
  return (
    <CustomDialog
      header={header}
      trigger={
        <TrashIcon className="text-red-500 hover:animate-pulse cursor-pointer" />
      }
      content={
        <div className="w-full flex flex-row justify-between items-center">
          <DialogClose>
            <Button className="w-[150px]">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => removeMeFromInbox.mutateAsync()}
              className="w-[150px]"
              variant={"destructive"}
            >
              Delete
            </Button>
          </DialogClose>
        </div>
      }
    />
  );
};
