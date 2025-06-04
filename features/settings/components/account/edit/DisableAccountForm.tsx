import { FormInput } from "@/components/custom/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useAuthStore } from "@/features/auth/store";
import {
  DeactivateUserDocument,
  DeactivateUserMutation,
  DeactivateUserMutationVariables,
} from "@/generated/graphql";
import { CookieKeys } from "@/helpers/cookies";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { requestWithAuth } from "@/lib/graphql/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { deactivateUserSchema } from "./zod";

export const DisableAccountForm = () => {
  const form = useForm<DeactivateUserMutationVariables>({
    resolver: zodResolver(deactivateUserSchema),
  });
  const { clearAuth } = useAuthStore();

  const disableUserMutation = useMutation({
    mutationFn: async () => {
      const res = await requestWithAuth<DeactivateUserMutation>(
        DeactivateUserDocument,
        {
          password: form.getValues("password"),
          confirmPassword: form.getValues("confirmPassword"),
        },
      );
      return res;
    },
    onSuccess: () => {
      toast("User deactivated");
      clearAuth();
      setCookie(CookieKeys.TOKEN, undefined);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });
  return (
    <FormProvider {...form}>
      <form>
        <div className="flex flex-col gap-md">
          <FormInput name="password" label={"Password"} secure={true} />
          <FormInput
            name="confirmPassword"
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
              variant={"destructive"}
              className="min-w-[150px]"
              type="button"
              onClick={() => {
                disableUserMutation.mutateAsync();
              }}
            >
              Disable Account
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
