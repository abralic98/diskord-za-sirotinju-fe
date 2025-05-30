import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open: boolean;
  content: ReactNode;
}
export const RightSidebar = ({open, content}:Props) => {
  return (
    <AnimatePresence initial={false}>
      {open && (
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
              {content}
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
