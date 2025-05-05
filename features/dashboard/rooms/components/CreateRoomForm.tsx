import React, { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ChooseRoomType } from "./ChooseRoomType";
import {
  CreateRoomDocument,
  CreateRoomInput,
  CreateRoomMutation,
  CreateRoomMutationVariables,
  RoomType,
} from "@/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomSchema } from "../zod";
import { FormInput } from "@/components/custom/form/FormInput";
import { CustomRadioGroup } from "@/components/custom/radio-group/CustomRadioGroup";
import {
  FormRadioGroup,
  SelectItemOption,
} from "@/components/custom/form/FormRadioGroup";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/graphql/client";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/helpers/queryKeys";
import { GraphqlCatchError } from "@/helpers/errors";
import { useIds } from "@/hooks/useIds";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const CreateRoomForm = ({ setOpen }: Props) => {
  const {serverId} = useIds()
  const form = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomSchema),
    defaultValues:{
      serverId: serverId
    }
  });
  const options: SelectItemOption[] = [
    {
      label: <ChooseRoomType type={RoomType.Voice} />,
      value: RoomType.Voice,
    },
    {
      label: <ChooseRoomType type={RoomType.Text} />,
      value: RoomType.Text,
    },
  ];

  const createServerMutation = useMutation({
    mutationFn: async (data: CreateRoomInput) => {
      const modifiedData: CreateRoomMutationVariables = {
        room: data,
      };
      const res = await client.request<CreateRoomMutation>(
        CreateRoomDocument,
        modifiedData,
      );
    },
    onSuccess: () => {
      toast("Room Created!");
      queryClient.refetchQueries({
        queryKey: [queryKeys.getRoomsByServerId],
      });
      setOpen(false);
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  console.log(form.formState.errors);
  const onSubmit = async (data: CreateRoomInput) => {
    createServerMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form>
        <div className="flex flex-col gap-md">
          <FormInput<CreateRoomInput> label="Room Name" name="name" />
          <FormRadioGroup<CreateRoomInput>
            label="Room Type"
            name="type"
            options={options}
            classNameOptions="bg-sidebar-accent"
          />
          <div className="w-full flex items-center justify-between">
            <Button
              className="min-w-[150px]"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="min-w-[150px]"
              onClick={form.handleSubmit(onSubmit)}
            >
              Create Room
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
