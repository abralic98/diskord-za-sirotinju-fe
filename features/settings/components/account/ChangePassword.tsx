"use client"
import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChangePasswordForm } from "./edit/ChangePasswordForm";

export const ChangePassword = () => {
  const title = "Update your password";
  const description = "Enter your current password and a new password";
  const header = {
    title,
    description,
  };

  return (
    <CustomDialog
      header={header}
      trigger={<Button>Change Password</Button>}
      content={<ChangePasswordForm />}
    />
  );
};
