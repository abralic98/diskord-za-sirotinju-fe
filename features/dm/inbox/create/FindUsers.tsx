import { FormInput } from "@/components/custom/form/FormInput";
import { H4 } from "@/components/typography";
import { GetAllUsersDocument, GetAllUsersQuery } from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SingleUser } from "./SingleUser";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

interface Props {
  onUserSelect: (userId: string) => Promise<any> | void;
}

export const FindUsers = ({ onUserSelect }: Props) => {
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

  const renderUsers = () => {
    if (!query.data?.pages?.length) return null;

    const allUsers = query.data.pages.flatMap(
      (page) => page.getAllUsers?.content ?? [],
    );

    if (!allUsers.length) return <H4>No Users found</H4>;

    return [...allUsers].map((user) => (
      <DialogClose onClick={() => onUserSelect(String(user.id))}>
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
