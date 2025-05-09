"use client";
import { CustomDialog } from "@/components/custom/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { DeleteAccountForm } from "./edit/DeleteAccountForm";

export const DeleteAccount = () => {
  const title = "Delete your account";
  const description = "WARNING: This will pernamently delete your account";
  const descriptionWarning = true // nemam volje prepravljat komponentu todo
  const header = {
    title,
    description,
    descriptionWarning
  };

  return (
    <CustomDialog
      header={header}
      trigger={<Button variant={"destructive"}>Delete Account</Button>}
      content={<DeleteAccountForm />}
    />
  );
};
