import { FormInput } from "@/components/custom/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserSchema } from "./zod";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { useAuthenticator } from "@/hooks/useAuthenticator";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const EditUsernameForm = () => {
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });
  const { refreshUserInfo } = useAuthenticator();

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const modifiedData: UpdateUserMutationVariables = {
        user: data,
      };
      const res = await requestWithAuth<UpdateUserMutation>(
        UpdateUserDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("Username updated!");
      refreshUserInfo();
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: UpdateUserInput) => {
    updateUserMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form>
        <div className="flex flex-col gap-md">
          <FormInput<UpdateUserInput> name="username" />
          <div className="flex flex-row justify-between items-center">
            <DialogClose>
              <Button className="min-w-[150px]" type="button">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                className="min-w-[150px]"
                onClick={form.handleSubmit(onSubmit)}
              >
                Change Username
              </Button>
            </DialogClose>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
