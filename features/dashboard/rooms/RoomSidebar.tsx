"use client";

import { MainSidebar } from "@/components/custom/sidebars/MainSidebar";
import {
  GetRoomsByServerIdDocument,
  GetRoomsByServerIdQuery,
  GetRoomsByServerIdQueryVariables,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { client } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import { SingleRoom } from "./components/SingleRoom";
import { useIds } from "@/hooks/useIds";
import { Context, ContextOption } from "@/components/custom/context/Context";
import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { CreateRoomForm } from "./components/CreateRoomForm";
import { DialogProps } from "@radix-ui/react-dialog";

export const RoomSidebar = () => {
  const { serverId } = useIds();
  const [open, setOpen] = useState(false);
  const header: CustomDialogProps["header"] = {
    title: "Create new room",
  };
  const { data, error } = useQuery<
    GetRoomsByServerIdQuery,
    GetRoomsByServerIdQueryVariables
  >({
    enabled: Boolean(serverId),
    queryKey: [queryKeys.getRoomsByServerId, serverId],
    queryFn: async (): Promise<GetRoomsByServerIdQuery> => {
      const variables: GetRoomsByServerIdQueryVariables = {
        id: String(serverId),
      };
      return await client.request(GetRoomsByServerIdDocument, variables);
    },
  });

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }

  const renderRooms = () => {
    return data?.getRoomsByServerId?.map((room) => {
      return <SingleRoom key={room?.id} room={room} />;
    });
  };
  const showDialog = () => {
    setOpen(true);
  };

  const options: ContextOption[] = [
    {
      name: "Create new room",
      func: () => showDialog(),
    },
  ];
  return (
    <MainSidebar
      content={
        <div className="h-full">
          <Context
            options={options}
            trigger={
              <div className="flex flex-col gap-md p-2 h-full">
                {renderRooms()}
                <CustomDialog
                  open={open}
                  header={header}
                  content={<CreateRoomForm setOpen={setOpen} />}
                />
              </div>
            }
          />
        </div>
      }
    />
  );
};
