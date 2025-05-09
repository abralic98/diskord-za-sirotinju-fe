"use client"
import {
  CustomDialog,
} from "@/components/custom/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { DisableAccountForm } from "./edit/DisableAccountForm";

export const DisableAccount = () => {
  const title = "Disable your account";
  const description = "Temporary disable your account";
  const header = {
    title,
    description,
  };

  return (
    <CustomDialog
      header={header}
      trigger={<Button variant={'destructive'}>Disable Account</Button>}
      content={<DisableAccountForm />}
    />
  );
};
