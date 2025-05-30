import {
  CreateDirectMessageDocument,
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables,
  CreateDmInput,
  MessageType,
} from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
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
export const CreateDirectMessage = ({ scrollRef }: Props) => {
  const { inboxId } = useIds();
  
  const [file, setFile] = useState<File | null>(null);
  const { isLoading, error, uploadedImage } = useCloudStorage({
    file,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreateDmInput>({
    defaultValues: {
      inboxId: inboxId,
      type: MessageType.Text,
    },
  });

  const createDirectMessageMutation = useMutation({
    mutationFn: async (data: CreateDmInput) => {
      const modifiedData: CreateDirectMessageMutationVariables = {
        message: data,
      };
      const res = await requestWithAuth<CreateDirectMessageMutation>(
        CreateDirectMessageDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      form.reset();
      setTimeout(() => {
        scrollToBottom(scrollRef.current);
      }, 100);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: CreateDmInput) => {
    createDirectMessageMutation.mutateAsync(data);
  };

  const openFile = () => {
    fileInputRef?.current?.click();
  };

  useEffect(() => {
    if (uploadedImage)
      createDirectMessageMutation.mutateAsync({
        type: MessageType.Attachment,
        inboxId: String(inboxId),
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
        {inboxId && (
          <div>
            <FormChatInput<CreateDmInput>
              name="text"
              placeholder="Start typing ..."
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
