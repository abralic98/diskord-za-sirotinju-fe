import { FormInput } from "@/components/custom/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  UpdateUserPasswordDocument,
  UpdateUserPasswordInput,
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "@/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserPasswordSchema } from "./zod";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";

export const ChangePasswordForm = () => {
  const form = useForm<UpdateUserPasswordInput>({
    resolver: zodResolver(updateUserPasswordSchema),
  });

  const updateUserPasswordMutation = useMutation({
    mutationFn: async (data: UpdateUserPasswordInput) => {
      const modifiedData: UpdateUserPasswordMutationVariables = {
        credentials: data,
      };
      const res = await requestWithAuth<UpdateUserPasswordMutation>(
        UpdateUserPasswordDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("Password Updated!");
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const onSubmit = async (data: UpdateUserPasswordInput) => {
    updateUserPasswordMutation.mutateAsync(data);
  };
  return (
    <FormProvider {...form}>
      <form>
        <div className="flex flex-col gap-md">
          <FormInput<UpdateUserPasswordInput>
            name="currentPassword"
            label={"Current password"}
            secure={true}
          />
          <FormInput<UpdateUserPasswordInput>
            name="newPassword"
            label={"New password"}
            secure={true}
          />
          <FormInput<UpdateUserPasswordInput>
            name="confirmNewPassword"
            label={"Confirm password"}
            secure={true}
          />
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
              Change Password
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
