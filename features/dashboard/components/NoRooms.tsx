"use client"
import React from "react";
import { EmptyLayout } from "./EmptyLayout";
import { Center } from "@/components/custom/Center";
import { CustomDialog, CustomDialogProps } from "@/components/custom/dialog/CustomDialog";
import NoMessagesIlustration from "@/assets/illustrations/NoMessagesIlustration";
import { CreateRoomForm } from "../rooms/components/CreateRoomForm";

const noRoomsStates = [
  {
    title: "No rooms yet",
    description: "Create a new room or join one to get started.",
  },
  {
    title: "Empty space...",
    description: "There are no rooms here yet. Make your own!",
  },
  {
    title: "No rooms available",
    description: "Create a new room and invite others to chat.",
  },
  {
    title: "No rooms created",
    description: "Looks like no rooms exist here. Start one now!",
  },
  {
    title: "This place is empty",
    description: "Create a room to start chatting.",
  },
];

export const NoRooms = () => {
  // Select a random empty state
  const randomIndex = Math.floor(Math.random() * noRoomsStates.length);
  const { title, description } = noRoomsStates[randomIndex];

  const header: CustomDialogProps["header"] = {
    title: "Create new room",
  };

  <EmptyLayout title={title} description={description} />;
  return (
    <Center>
      <CustomDialog
        header={header}
        content={<CreateRoomForm />}
        trigger={
          <EmptyLayout
            title={title}
            description={description}
            illustration={<NoMessagesIlustration />}
          />
        }
      />
    </Center>
  );
};
