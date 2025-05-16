import { H4, Text } from "@/components/typography";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren, ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  content: ReactNode;
  className?: string;
}
export const ServerSettingCard = ({
  title,
  description,
  content,
  className,
}: Props) => {
  return (
    <div className={cn("bg-sidebar min-w-[400px] flex flex-col gap-sm rounded-md p-4", className)}>
      <H4>{title}</H4>
      <Text>{description}</Text>
      {content}
    </div>
  );
};
