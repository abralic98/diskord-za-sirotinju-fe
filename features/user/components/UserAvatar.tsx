import { H4 } from "@/components/typography";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  imgPath?: string;
  className?: string
}

type DummyColors = "bg-red-500" | "bg-yellow-500" | "bg-blue-500";

export const UserAvatar = ({ imgPath, className }: Props) => {
  if (imgPath) return <div>kad bude slika</div>;
  return <NoAvatar className={className} />;
};

const NoAvatar = ({className}:{className?: string}) => {
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
    <div className={cn(getRandomColor(), "w-11 h-11 rounded-full flex items-center justify-center", className)}>
      <H4>EZ</H4>
    </div>
  );
};
