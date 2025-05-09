import { FormInput } from "@/components/custom/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export const DisableAccountForm = () => {
  const form = useForm();
  const submit = () => {
    //
  };
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
              onClick={form.handleSubmit(submit)}
            >
              Disable Account
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
