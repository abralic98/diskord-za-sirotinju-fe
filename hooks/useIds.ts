import { useParams } from "next/navigation";

export const useIds = () => {
  const params = useParams();

  const serverId = params.serverId as string | undefined;
  const roomId = params.roomId as string | undefined;

  return { serverId, roomId };
};
