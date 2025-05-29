"use client";

import { GetMyInboxDocument, GetMyInboxQuery } from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { requestWithAuth } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { SingleInbox } from "./inbox/SingleInbox";
import { InboxSidebar } from "@/components/custom/sidebars/InboxSidebar";
import { Text } from "@/components/typography";
import { CreateNewDM } from "./inbox/create/CreateNewDM";

export const DMSidebar = () => {
  const { data, error } = useQuery<GetMyInboxQuery>({
    queryKey: [queryKeys.getMyInbox],
    queryFn: async (): Promise<GetMyInboxQuery> => {
      return await requestWithAuth(GetMyInboxDocument);
    },
  });

  if (error) {
    handleGraphqlError(error);
  }

  const renderInboxes = () => {
    return data?.getMyInbox?.map((inbox) => {
      return <SingleInbox key={inbox?.id} inbox={inbox} />;
    });
  };

  return (
    <InboxSidebar
      content={
        <div className="flex flex-col gap-sm h-full border border-sidebar-border p-2 pt-7">
          <CreateNewDM />
          <Text>Direct messages</Text>
          {renderInboxes()}
        </div>
      }
    />
  );
};
