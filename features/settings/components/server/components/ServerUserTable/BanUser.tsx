import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  BanUserFromServerDocument,
  BanUserFromServerMutation,
  BanUserFromServerMutationVariables,
  BanUserInput,
  User,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { RefObject } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { banUserSchema } from "../../zod";
import { FormTextarea } from "@/components/custom/form/FormTextArea";

interface Props {
  user?: User | null;
  closeRef: RefObject<HTMLButtonElement | null>;
}
type BanUserInputModified = Omit<BanUserInput, "serverId" | "userId">;

export const BanUser = ({ user, closeRef }: Props) => {
  const { serverSettingsId } = useIds();
  const form = useForm<BanUserInputModified>({
    resolver: zodResolver(banUserSchema),
  });
  const banUserMutation = useMutation({
    mutationFn: async (data: BanUserInputModified) => {
      const modifiedData: BanUserFromServerMutationVariables = {
        input: {
          ...data,
          serverId: String(serverSettingsId),
          userId: String(user?.id),
        },
      };
      const res = await requestWithAuth<BanUserFromServerMutation>(
        BanUserFromServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("User Banned");
      closeRef.current?.click();
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

  const handleBan = (data: BanUserInputModified) => {
    if (!serverSettingsId) return;
    if (!user?.id) return;
    banUserMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form>
        <div className="flex flex-col gap-md">
          <div className="flex flex-col gap-sm">
            <Text>Ban {user?.username} from server</Text>
            <Text className="font-medium">
              User will not be able to join back
            </Text>
          </div>
          <FormTextarea<BanUserInputModified> name="reason" label="Reason" />
          <div className="w-full flex flex-row gap-md items-center">
            <DialogClose>
              <Button type="button" className="w-[150px]">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-[150px]"
              variant="destructive"
              onClick={form.handleSubmit(handleBan)}
            >
              Ban
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
