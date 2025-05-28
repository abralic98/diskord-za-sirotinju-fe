"use client";

import { MainSidebar } from "@/components/custom/sidebars/MainSidebar";
import {
  GetRoomsByServerIdDocument,
  GetRoomsByServerIdQuery,
  GetRoomsByServerIdQueryVariables,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { requestWithAuth } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { SingleRoom } from "./components/SingleRoom";
import { useIds } from "@/hooks/useIds";
import { Context, ContextOption } from "@/components/custom/context/Context";
import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { CreateRoomForm } from "./components/CreateRoomForm";
import { useRoomListSidebarStore } from "./store";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import { VoiceRoomList } from "@/features/voice/components/VoiceRoomList";

export const RoomSidebar = () => {
  const { serverId } = useIds();
  const { setRooms } = useRoomListSidebarStore();
  const { replace } = useRouter();
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
      return await requestWithAuth(GetRoomsByServerIdDocument, variables);
    },
  });

  useEffect(() => {
    if (data?.getRoomsByServerId) {
      setRooms(data.getRoomsByServerId ?? []);
    }
  }, [data]);

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    try {
      toast(err.response.errors[0].message);
      if (err.response.errors[0].message.includes("not found")) {
        replace(routes.dashboard);
      }
    } catch {}
  }

  const renderTextRooms = () => {
    return data?.getRoomsByServerId?.text?.map((room) => {
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
        <div className="h-full border border-sidebar-border">
          <Context
            options={options}
            trigger={
              <div className="flex flex-col gap-md p-2 h-full">
                {renderTextRooms()}
                <VoiceRoomList rooms={data?.getRoomsByServerId?.voice ?? []} />
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
