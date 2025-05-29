import React from "react";
import { H4, Text } from "@/components/typography";
import { useSidebar } from "@/components/ui/sidebar";
import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { InboxCard } from "../InboxCard";
import { FindUsers } from "./FindUsers";

export const CreateNewDM = () => {
  const { open } = useSidebar();
  const header: CustomDialogProps["header"] = {
    title: "Create new DM",
    description: "Open private chat",
  };

  const trigger = () => {
    return (
      <InboxCard className="h-10 flex items-center justify-center">
        {open ? (
          <Text className="cursor-pointer">Start new conversation</Text>
        ) : (
          <H4>+</H4>
        )}
      </InboxCard>
    );
  };

  return (
    <CustomDialog header={header} content={<FindUsers />} trigger={trigger()} />
  );
};
