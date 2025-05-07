import React from "react";
import { EmptyLayout } from "./EmptyLayout";
import { Center } from "@/components/custom/Center";
import NoServerIllustration from "@/assets/illustrations/NoServerIllustration";
import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { CreateServerForm } from "../servers/components/CreateServerForm";

const noServersStates = [
  {
    title: "No servers yet",
    description: "Create or join a server to start chatting.",
  },
  {
    title: "No servers available",
    description:
      "Looks like you don’t belong to any server yet. Create or join one.",
  },
  {
    title: "You’re not in any server",
    description:
      "Servers are where the action happens. Create or join one to get started!",
  },
  {
    title: "Empty space...",
    description:
      "There are no servers here yet. Find or create one to start chatting!",
  },
  {
    title: "No servers joined",
    description: "You need to join or create a server to begin chatting.",
  },
];

export const NoServers = () => {
  // Select a random empty state
  const randomIndex = Math.floor(Math.random() * noServersStates.length);
  const { title, description } = noServersStates[randomIndex];

  const header: CustomDialogProps["header"] = {
    title: "Create new Server",
  };

  return (
    <Center>
      <CustomDialog
        header={header}
        content={<CreateServerForm />}
        trigger={
          <EmptyLayout
            className="bottom-20"
            title={title}
            description={description}
            illustration={
              <NoServerIllustration className="w-[200px] h-[200px]" />
            }
          />
        }
      />
    </Center>
  );
};
