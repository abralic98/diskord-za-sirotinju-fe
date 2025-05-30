"use client";
import {
  CreateMessageDocument,
  CreateMessageInput,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetRoomByIdQuery,
  MessageType,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { queryClient } from "@/lib/react-query/queryClient";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { scrollToBottom } from "@/helpers/scrollToBottom";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { FormChatInput } from "@/components/custom/form/FormChatInput";
import { Image } from "lucide-react";
import { useCloudStorage } from "@/hooks/useCloudStorage";

interface Props {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}
export const CreateMessage = ({ scrollRef }: Props) => {
  const { roomId } = useIds();
  const [file, setFile] = useState<File | null>(null);
  const { isLoading, uploadedImage } = useCloudStorage({
    file,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const room: GetRoomByIdQuery | undefined = queryClient.getQueryData([
    queryKeys.getRoomById,
    roomId,
  ]);

  const form = useForm<CreateMessageInput>({
    defaultValues: {
      roomId: roomId,
      type: MessageType.Text,
    },
  });
  const placeholder = room?.getRoomById?.name
    ? `Message # ${room.getRoomById.name}`
    : "Start typing";

  const createMessageMutation = useMutation({
    mutationFn: async (data: CreateMessageInput) => {
      const modifiedData: CreateMessageMutationVariables = {
        message: data,
      };
      const res = await requestWithAuth<CreateMessageMutation>(
        CreateMessageDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      form.reset();
      //timeut da normalno skrolne a ne uvijek zadnji element ostane nevidljiv
      setTimeout(() => {
        scrollToBottom(scrollRef.current);
      }, 100);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: CreateMessageInput) => {
    createMessageMutation.mutateAsync(data);
  };

  const openFile = () => {
    fileInputRef?.current?.click();
  };

  useEffect(() => {
    if (uploadedImage)
      createMessageMutation.mutateAsync({
        type: MessageType.Attachment,
        roomId: String(roomId),
        imageUrl: uploadedImage,
        text: "",
      });
  }, [uploadedImage]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }
        }}
      >
        {room && (
          <div>
            <FormChatInput<CreateMessageInput>
              name="text"
              placeholder={placeholder}
              inputClassName="h-14"
              containerClassName="bg-sidebar-hover"
              icon={<Image />}
              onClickIcon={openFile}
              disabled={isLoading}
            />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                setFile(selectedFile);
              }}
            />
          </div>
        )}
      </form>
    </FormProvider>
  );
};
