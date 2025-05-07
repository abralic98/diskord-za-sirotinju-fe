import { FormInput } from "@/components/custom/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  CreateServerDocument,
  CreateServerInput,
  CreateServerMutation,
  CreateServerMutationVariables,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { client } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createServerSchema } from "../zod";
import { FormSwitch } from "@/components/custom/form/FormSwitch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";

export const CreateServerForm = () => {
  const form = useForm<CreateServerInput>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      publicServer: false,
    },
  });
  const { push } = useRouter()

  const createServerMutation = useMutation({
    mutationFn: async (data: CreateServerInput) => {
      const modifiedData: CreateServerMutationVariables = {
        server: data,
      };
      const res = await client.request<CreateServerMutation>(
        CreateServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: (data) => {
      toast("Server Created!");
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllServersSidebar],
      });
      push(`${routes.dashboard}/${data.createServer?.id}`)

    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const onSubmit = async (data: CreateServerInput) => {
    createServerMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-md">
        <FormInput<CreateServerInput> label="Server name" name="name" />
        <FormSwitch<CreateServerInput>
          label="Public Server"
          name="publicServer"
        />
        {form.watch("publicServer") === true && (
          <Label>Server will appear on discovery page</Label>
        )}
        <div className="flex flex-row justify-between">
          <DialogClose asChild>
            <Button
              isLoading={createServerMutation.isPending}
              type="button"
              onClick={() => {
                onSubmit(form.getValues());
              }}
              className="max-w-[150px]"
            >
              Create server
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </div>
      </form>
    </FormProvider>
  );
};
