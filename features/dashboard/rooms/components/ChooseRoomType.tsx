import { H4, Text } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { RoomType } from "@/generated/graphql";
import { AudioLines } from "lucide-react";
import React from "react";

interface Props {
  type: RoomType;
}
export const ChooseRoomType = ({ type }: Props) => {
  const icon = type === RoomType.Text ? <H4>#</H4> : <AudioLines />;
  const description =
    type === RoomType.Text
      ? "Send messages, images"
      : "Hang out together with voice";
  return (
    <div className="w-full h-20 p-5">
      <div className="flex items-center justify-start gap-md">
        {icon}
        <div className="flex flex-col gap-sm">
          <Text>{type}</Text>
          <Label>{description}</Label>
        </div>
      </div>
    </div>
  );
};
