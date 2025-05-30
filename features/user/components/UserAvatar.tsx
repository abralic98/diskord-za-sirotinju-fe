import { UserPresence } from "@/components/custom/user/UserPresence";
import { H4 } from "@/components/typography";
import { Maybe, UserPresenceType } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  userAvatar?: string | Maybe<string> | undefined;
  withPresence?: UserPresenceType;
  presenceClassName?: string
}

type DummyColors = "bg-red-500" | "bg-yellow-500" | "bg-blue-500";

export const UserAvatar = ({ className, userAvatar, withPresence, presenceClassName }: Props) => {
  if (userAvatar)
    return (
      <div className="relative w-fit">
        <HasAvatar className={className} path={userAvatar} />
        {withPresence && <UserPresence className={presenceClassName} presence={withPresence} />}
      </div>
    );
  return <NoAvatar className={className} />;
};

const HasAvatar = ({
  path,
  className,
}: {
  path: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center bg-sidebar-accent overflow-hidden relative",
        className,
      )}
    >
      <Image alt="user avatar" width={200} height={200} src={path} />
    </div>
  );
};

const NoAvatar = ({ className }: { className?: string }) => {
  const getRandomColor = (): DummyColors => {
    const colors: DummyColors[] = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-blue-500",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    <div
      className={cn(
        getRandomColor(),
        "w-11 h-11 rounded-full flex items-center justify-center",
        className,
      )}
    >
      <H4 className="text-sm">EZ</H4>
    </div>
  );
};
