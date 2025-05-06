import { Room, RoomType } from "@/generated/graphql";
import { ReactNode } from "react";
import { H4 } from "@/components/typography";
import { AudioLines } from "lucide-react";

interface Props{
  room? : Room | null
}
export const getRoomIcon = ({ room }: Props): ReactNode => {
  const icon: ReactNode = room?.type === RoomType.Text ? <H4>#</H4> : <AudioLines />;
  return icon;
};
