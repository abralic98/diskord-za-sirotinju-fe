"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import {
  GetUsersByServerIdDocument,
  GetUsersByServerIdQuery,
} from "@/generated/graphql";
import { client } from "@/lib/graphql/client";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import { SingleUser } from "./components/SingleUser";
import { useIds } from "@/hooks/useIds";
import { useUserListSidebarStore } from "./store";
import { motion, AnimatePresence } from "framer-motion";

export const ServerUsersSidebar = () => {
  const { isOpen } = useUserListSidebarStore();
  const { serverId } = useIds();

  const { data, error } = useQuery({
    queryKey: [queryKeys.getUsersByServerId],
    enabled: Boolean(serverId) && isOpen,
    queryFn: async (): Promise<GetUsersByServerIdQuery> => {
      return await client.request<GetUsersByServerIdQuery>(
        GetUsersByServerIdDocument,
        { id: serverId },
      );
    },
  });

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }

  const renderUsers = () => {
    return data?.getUsersByServerId?.map((user) => {
      return <SingleUser key={user?.id} user={user} />;
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
