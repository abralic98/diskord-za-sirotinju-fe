"use client";
import { FormInput } from "@/components/custom/form/FormInput";
import { FormTextarea } from "@/components/custom/form/FormTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Server,
  UpdateServerDocument,
  UpdateServerMutation,
  UpdateServerMutationVariables,
} from "@/generated/graphql";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/helpers/queryKeys";
import { updateServerSchema } from "../zod";
import { handleGraphqlError } from "@/helpers/handleGQLError";

interface ModifiedServerInput {
  name: string;
  description?: string;
}

export const EditBasicServerInfoForm = ({
  server,
}: {
  server?: Server | null;
}) => {
  const form = useForm<ModifiedServerInput>({
    resolver: zodResolver(updateServerSchema),
    defaultValues: {
      name: server?.name ?? "",
      description: server?.description ?? "",
    },
  });

  const updateServer = useMutation({
    mutationFn: async (data: ModifiedServerInput) => {
      if (!server?.id) return;
      const modifiedData: UpdateServerMutationVariables = {
        server: {
          ...data,
          id: server?.id,
        },
      };
      const res = await requestWithAuth<UpdateServerMutation>(
        UpdateServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("Server updated!");
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, server?.id],
      });
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const submit = (data: ModifiedServerInput) => {
    updateServer.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-md">
        <FormInput<ModifiedServerInput> name="name" label="Server Name" />
        <FormTextarea<ModifiedServerInput>
          name="description"
          label="Server description"
        />
        <div className="flex flex-row justify-between items-center">
          <Button
            onClick={() => form.reset()}
            className="w-[150px]"
            type="button"
          >
            Cancel
          </Button>
          <Button
            isLoading={updateServer.isPending}
            onClick={form.handleSubmit(submit)}
            className="w-[150px]"
            type="button"
          >
            Apply
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
