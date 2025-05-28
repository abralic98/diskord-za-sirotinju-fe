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
import { FormProvider, useForm } from "react-hook-form";
import { updateUserSchema } from "./zod";
import { useAuthenticator } from "@/hooks/useAuthenticator";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const EditPhoneNumberForm = () => {
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });

  const { refreshUserInfo } = useAuthenticator();

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const modifiedData: UpdateUserMutationVariables = {
        user: {
          ...data,
          phoneNumber: Number(data.phoneNumber),
        },
      };
      const res = await requestWithAuth<UpdateUserMutation>(
        UpdateUserDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("Phone number updated!");
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
          <FormInput name="phoneNumber" label={"Phone Number"} type="number" />
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
              Update phone number
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
