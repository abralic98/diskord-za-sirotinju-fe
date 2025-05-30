import {
  CreateDirectMessageDocument,
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables,
  CreateDmInput,
  MessageType,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { queryClient } from "@/lib/react-query/queryClient";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { scrollToBottom } from "@/helpers/scrollToBottom";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { FormChatInput } from "@/components/custom/form/FormChatInput";

interface Props {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}
export const CreateDirectMessage = ({ scrollRef }: Props) => {
  const { inboxId } = useIds();

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
      queryClient.refetchQueries({
        queryKey: [queryKeys.getMessagesByInboxId, inboxId],
      });
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
        <FormChatInput<CreateDmInput>
          name="text"
          placeholder="Start typing ..."
          inputClassName="h-14"
          containerClassName="bg-sidebar-hover"
        />
      </form>
    </FormProvider>
  );
};
