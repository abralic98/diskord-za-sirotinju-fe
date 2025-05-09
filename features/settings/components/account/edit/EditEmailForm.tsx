import { FormInput } from "@/components/custom/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { UpdateUserDocument, UpdateUserInput, UpdateUserMutation, UpdateUserMutationVariables } from "@/generated/graphql";
import { useAuthenticator } from "@/hooks/useAuthenticator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserSchema } from "./zod";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";

export const EditEmailForm = () => {
  const form = useForm<UpdateUserInput>({
    resolver:zodResolver(updateUserSchema)
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
      toast("Email updated!");
      refreshUserInfo();
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const onSubmit = async (data: UpdateUserInput) => {
    updateUserMutation.mutateAsync(data);
  };
  return (
    <FormProvider {...form}>
      <form>
        <div className="flex flex-col gap-md">
          <FormInput name="email" label={"New Email"} type="email" />
          <div className="flex flex-row justify-between items-center">
            <DialogClose>
              <Button className="min-w-[150px]" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="min-w-[150px]"
              onClick={form.handleSubmit(onSubmit)}
            >
              Change Email
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
