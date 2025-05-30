import React from "react";
import { H4, Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { InboxCard } from "../InboxCard";
import { FindUsers } from "./FindUsers";
import { useMutation } from "@tanstack/react-query";
import {
  CreateInboxDocument,
  CreateInboxMutation,
  CreateInboxMutationVariables,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/helpers/queryKeys";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const CreateNewDM = () => {
  const { open } = useSidebar();
  const { push } = useRouter();
  const header: CustomDialogProps["header"] = {
    title: "Create new DM",
    description: "Open private chat",
  };

  const createDMMutation = useMutation({
    mutationFn: async (userId?: string | null) => {
      if (!userId) return;
      const modifiedData: CreateInboxMutationVariables = {
        withUserId: userId,
      };
      const res = await requestWithAuth<CreateInboxMutation>(
        CreateInboxDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.getMyInbox],
      });
      push(`${routes.dm}/${data?.createInbox?.id}`);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const trigger = () => {
    return (
      <InboxCard className="h-10 flex items-center justify-center">
        {open ? (
          <Text className="cursor-pointer">Start new conversation</Text>
        ) : (
          <H4>+</H4>
        )}
      </InboxCard>
    );
  };

  return (
    <CustomDialog
      header={header}
      content={
        <FindUsers
          onUserSelect={async (userId) => {
            await createDMMutation.mutateAsync(userId);
          }}
        />
      }
      trigger={trigger()}
    />
  );
};
