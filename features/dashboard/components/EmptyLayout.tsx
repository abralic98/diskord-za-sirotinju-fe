import NoMessagesIlustration from "@/assets/illustrations/NoMessagesIlustration";
import { H3, H4, Text } from "@/components/typography";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  illustration?: ReactNode;
  className?: string
}
export const EmptyLayout = ({ title, description, illustration, className }: Props) => {
  return (
    <div className="relative w-[500px]  h-[500px] bg-sidebar-border rounded-xl p-6 flex flex-col items-center gap-md border-8 border-sidebar cursor-pointer">
      <H3>{title}</H3>
      <H4>{description}</H4>
      <div className={cn("absolute bottom-30", className)}>
        {illustration ? (
          illustration
        ) : (
          <NoMessagesIlustration className="w-[200px] h-[200px]" />
        )}
      </div>
    </div>
  );
};
