"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import { GetServerByIdDocument, GetServerByIdQuery } from "@/generated/graphql";
import { SingleUser } from "./components/SingleUser";
import { useIds } from "@/hooks/useIds";
import { useUserListSidebarStore } from "./store";
import { motion, AnimatePresence } from "framer-motion";
import { requestWithAuth } from "@/lib/graphql/client";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const ServerUsersSidebar = () => {
  const { isOpen } = useUserListSidebarStore();
  const { serverId } = useIds();

  const { data, error } = useQuery({
    queryKey: [queryKeys.getServerById, serverId],
    enabled: Boolean(serverId),
    queryFn: async (): Promise<GetServerByIdQuery> => {
      return await requestWithAuth<GetServerByIdQuery>(GetServerByIdDocument, {
        id: serverId,
      });
    },
  });

  if (error) {
    handleGraphqlError(error);
  }

  const renderUsers = () => {
    const ownerId = data?.getServerById?.createdBy?.id;
    return data?.getServerById?.joinedUsers?.map((user) => {
      const isOwner = user?.id === ownerId;
      return <SingleUser isOwner={isOwner} key={user?.id} user={user} />;
    });
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 400, opacity: 1, minWidth: 300 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full bg-sidebar border border-sidebar-accent overflow-hidden"
        >
          <ScrollArea className="h-full w-full">
            <div className="overflow-y-scroll w-full p-2 flex flex-col gap-sm">
              {renderUsers()}
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
