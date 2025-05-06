import { RoomType } from "@/generated/graphql";
import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(1, { message: "Empty field" }),
  serverId: z.string().min(1, { message: "Missing serverId" }),
  type: z.nativeEnum(RoomType, { message: "Invalid room type" }),
});

