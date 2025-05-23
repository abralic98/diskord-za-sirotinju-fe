import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export const BaseCard = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-md min-w-[500px] bg-sidebar-accent p-5 rounded-md", className)}>
      {children}
    </div>
  );
};
