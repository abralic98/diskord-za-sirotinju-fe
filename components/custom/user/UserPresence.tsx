import { UserPresenceType } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import React from "react";

export const UserPresence = ({
  presence,
  className,
}: {
  presence: UserPresenceType;
  className?: string;
}) => {
  return <Status presence={presence} className={className} />;
};

const Status = ({
  presence,
  className,
}: {
  presence: UserPresenceType;
  className?: string;
}) => {
  const statusColor = {
    [UserPresenceType.Online]: "bg-green-500",
    [UserPresenceType.Away]: "bg-orange-500",
    [UserPresenceType.Busy]: "bg-red-500",
    [UserPresenceType.Offline]: "bg-gray-500",
  }[presence];

  return (
    <div
      className={cn(
        statusColor,
        "w-3 h-3 absolute bottom-0 right-0 rounded-full border border-black",
        className,
      )}
    />
  );
};
