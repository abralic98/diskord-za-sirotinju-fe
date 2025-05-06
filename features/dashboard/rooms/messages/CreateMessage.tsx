"use client";
import {
  CreateMessageDocument,
  CreateMessageInput,
  CreateMessageMutation,
  GetRoomByIdQuery,
  MessageType,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { queryClient } from "@/lib/react-query/queryClient";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormChatInput } from "./FormChatInput";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/graphql/client";
import { GraphqlCatchError } from "@/helpers/errors";
import { toast } from "sonner";

export const CreateMessage = () => {
  const { roomId } = useIds();
  const room: GetRoomByIdQuery | undefined = queryClient.getQueryData([
    queryKeys.getRoomById,
    roomId,
  ]);

  const form = useForm<CreateMessageInput>({
    defaultValues:{
      roomId: roomId,
      type: MessageType.Text // for now
    }
  });
  const placeholder = room?.getRoomById?.name
    ? `Message # ${room.getRoomById.name}`
    : "Start typing";

  const createMessageMutation = useMutation({
    mutationFn: async (data: CreateMessageInput) => {
      const modifiedData = {
        message: data,
      };
      const res = await client.request<CreateMessageMutation>(
        CreateMessageDocument,
        modifiedData,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.getMessagesByRoomId, roomId],
      });
      form.reset();
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const onSubmit = async (data: CreateMessageInput) => {
    createMessageMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevent new line and form refresh
            form.handleSubmit(onSubmit)();
          }
        }}
      >
        <FormChatInput<CreateMessageInput>
          name="text"
          placeholder={placeholder}
          inputClassName="h-14"
          containerClassName="bg-sidebar-hover"
        />
      </form>
    </FormProvider>
  );
};
