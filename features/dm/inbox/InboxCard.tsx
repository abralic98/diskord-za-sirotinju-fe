import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export const InboxCard = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-row w-full bg-sidebar-accent2 gap-md p-1 rounded-md hover:bg-sidebar-hover cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
};
