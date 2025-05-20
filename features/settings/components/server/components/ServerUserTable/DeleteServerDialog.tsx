import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { DeleteServer } from "./DeleteServer";

export const DeleteServerDialog = () => {
  const header: CustomDialogProps["header"] = {
    title: "Delete Server",
    description:
      "This action will remove all users from server and delete all rooms and messages",
  };
  return (
    <CustomDialog
      header={header}
      trigger={<Button variant={"destructive"}>Delete Server</Button>}
      content={<DeleteServer />}
    />
  );
};
