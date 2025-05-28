import { Button } from "@/components/ui/button";
import {
  GenerateInviteLinkDocument,
  GenerateInviteLinkMutation,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export const CreateInvitationLink = () => {
  const { serverSettingsId } = useIds();

  const createInvitationMutation = useMutation({
    mutationFn: async () => {
      if (serverSettingsId)
        return requestWithAuth<GenerateInviteLinkMutation>(
          GenerateInviteLinkDocument,
          {
            serverId: serverSettingsId,
          },
        );
    },
    onSuccess: (res) => {
      if (res?.generateInviteLink) {
        navigator.clipboard.writeText(res.generateInviteLink).then(() => {
          toast("Invitation link copied to clipboard");
        });
      }
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });
  return (
    <Button
      className="w-[150px]"
      onClick={() => {
        createInvitationMutation.mutateAsync();
      }}
      isLoading={createInvitationMutation.isPending}
    >
      Create invitation
    </Button>
  );
};
