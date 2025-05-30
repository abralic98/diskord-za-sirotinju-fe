import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import {
  AddUserToInboxDocument,
  AddUserToInboxMutation,
  AddUserToInboxMutationVariables,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { queryKeys } from "@/helpers/queryKeys";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import { UserRoundPlusIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { FindUsers } from "../inbox/create/FindUsers";
import { useIds } from "@/hooks/useIds";

export const AddMoreUsers = () => {
  const { inboxId } = useIds();
  const header: CustomDialogProps["header"] = {
    title: "Add users to this inbox",
  };
  const addUserToDmMutation = useMutation({
    mutationFn: async (data: AddUserToInboxMutationVariables) => {
      const res = await requestWithAuth<AddUserToInboxMutation>(
        AddUserToInboxDocument,
        data,
      );
      return res;
    },
    onSuccess: () => {
      toast("User added");
      queryClient.refetchQueries({
        queryKey: [queryKeys.getInboxById],
      });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getMyInbox],
      });
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  return (
    <div>
      <CustomDialog
        header={header}
        trigger={<UserRoundPlusIcon className="cursor-pointer" />}
        content={
          <FindUsers
            onUserSelect={async (userId) => {
              if (!inboxId) return;
              await addUserToDmMutation.mutateAsync({
                inboxId: inboxId,
                userId,
              });
            }}
          />
        }
      />
    </div>
  );
};
