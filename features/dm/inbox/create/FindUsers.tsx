import { FormInput } from "@/components/custom/form/FormInput";
import { H4 } from "@/components/typography";
import {
  CreateInboxDocument,
  CreateInboxMutation,
  CreateInboxMutationVariables,
  GetAllUsersDocument,
  GetAllUsersQuery,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SingleUser } from "./SingleUser";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { DialogClose } from "@/components/ui/dialog";

export const FindUsers = () => {
  const form = useForm<{ search: string }>();
  const { push } = useRouter();

  const search = form.watch("search");

  const query = usePagination<GetAllUsersQuery, "getAllUsers">({
    queryKey: [queryKeys.getAllServersDiscovery],
    document: GetAllUsersDocument,
    dataField: "getAllUsers",
    pageSize: 10,
    gcTime: 0,
    search: search,
    enabled: false,
  });

  useDebounce(
    () => {
      if (!search && search == "") return;
      query.refetch();
    },
    300,
    [search],
  );

  const createDMMutation = useMutation({
    mutationFn: async (userId?: string | null) => {
      if (!userId) return;
      const modifiedData: CreateInboxMutationVariables = {
        withUserId: userId,
      };
      const res = await requestWithAuth<CreateInboxMutation>(
        CreateInboxDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.getMyInbox],
      });
      push(`${routes.dm}/${data?.createInbox?.id}`);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const renderUsers = () => {
    if (!query.data?.pages?.length) return null;

    const allUsers = query.data.pages.flatMap(
      (page) => page.getAllUsers?.content ?? [],
    );

    if (!allUsers.length) return <H4>No Users found</H4>;

    return [...allUsers].map((user) => (
      <DialogClose onClick={() => createDMMutation.mutateAsync(user.id)}>
        <SingleUser key={user.id} user={user} />
      </DialogClose>
    ));
  };

  return (
    <FormProvider {...form}>
      <form>
        <FormInput
          name="search"
          placeholder="Start typing"
          label="Find users"
        />
        <div className="overflow-scroll max-h-[500px] flex flex-col gap-sm pt-3">
          {renderUsers()}
        </div>
      </form>
    </FormProvider>
  );
};
